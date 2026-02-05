import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import { WebPartContext } from '@microsoft/sp-webpart-base';

export function getUSERID(WebUrl: string, spHttpClient: SPHttpClient, username: any) {

  let url = WebUrl + "/_api/web/SiteUserInfoList/items?$select=Id&$filter=Title eq '" + username + "'";


  return spHttpClient.get(url,
    SPHttpClient.configurations.v1,
    {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    }).then((response: SPHttpClientResponse) => {
      console.log("response");
      /*if(response.ok)
      {
         response.json().then((data)=>{
             console.log(data.value);
             var userID=data;
        alert(userID);
        });
      }*/

      return response.json();
    });
}

export function GetListItem(WebUrl: string, spHttpClient: SPHttpClient, ListName: string, options: any) {

  //let returnval =[];
  let url = WebUrl + "/_api/web/lists/getbytitle('" + ListName + "')/Items";
  url = URLBuilder(url, options);

  return spHttpClient.get(url,
    SPHttpClient.configurations.v1,
    {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    }).then((response: SPHttpClientResponse) => {
      console.log("response");

      return response.json();
    });

}


export function CreateItem(WebUrl: string, spHttpClient: SPHttpClient, ListName: string, jsonBody: any) {



  if (!jsonBody.__metadata) {
    jsonBody.__metadata = {
      'type': 'SP.ListItem'
    };
  }


  const URL = WebUrl + "/_api/web/lists/getbytitle('" + ListName + "')/Items";
  return spHttpClient.post(URL,
    SPHttpClient.configurations.v1, {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'odata-version': '3.0'
    },
    body: JSON.stringify(jsonBody)
  }).then((response: SPHttpClientResponse) => {
    if (response.ok) {
      return response.json();
    }
  });

}

export async function UpdateFileMetadata(
  WebUrl: string,
  spHttpClient: SPHttpClient,
  ListName: string,
  jsonBody: any,
  ID: number
): Promise<any> {
  try {
    // 🔹 Get List Item Entity Type Name
    // const entityUrl = `${WebUrl}/_api/web/lists/getbytitle('${ListName}')?$select=ListItemEntityTypeFullName`;
    // const entityResponse = await spHttpClient.get(
    //   entityUrl,
    //   SPHttpClient.configurations.v1,
    //   {
    //     headers: {
    //       'Accept': 'application/json;odata=verbose',
    //       'odata-version': ''
    //     },
    //   }
    // ).then((response: SPHttpClientResponse) => {
    //   console.log("response");
    //   /*if(response.ok)
    //   {
    //      response.json().then((data)=>{
    //          console.log(data.value);
    //          var userID=data;
    //     alert(userID);
    //     });
    //   }*/

    //   return response.json();
    // });

    const entityUrl = `${WebUrl}/_api/web/lists/getbytitle('${ListName}')?$select=ListItemEntityTypeFullName`;

    const entityResponse = await spHttpClient.get(
      entityUrl,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=verbose',
          'odata-version': '3.0'
        }
      }
    );



    // if (!entityResponse.ok) {
    //   throw new Error(`Failed to fetch entity name: ${entityResponse.statusText}`);
    // }

    // const entityData = await entityResponse.json();
    //const text = await entityResponse.text(); 
    //const entityName = entityResponse?.d?.ListItemEntityTypeFullName;
    const textResponse = await entityResponse.text(); // Get raw text (XML or JSON)
    let entityName = "";

    try {
      // Try parsing as JSON first
      const jsonData = JSON.parse(textResponse);
      entityName = jsonData.ListItemEntityTypeFullName || jsonData.d?.ListItemEntityTypeFullName;
    } catch (jsonError) {
      // If JSON parsing fails, parse as XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textResponse, "text/xml");
      const entityNode = xmlDoc.getElementsByTagName("d:ListItemEntityTypeFullName")[0];
      entityName = entityNode?.textContent ?? "SP.Data.ListItem";

    }

    jsonBody.__metadata = { "type": entityName };

    // if (!entityName) {
    //   throw new Error("Entity name not found for list: " + ListName);
    // }

    // 🔹 Add metadata type


    // 🔹 Update item metadata
    const updateUrl = `${WebUrl}/_api/web/lists/getbytitle('${ListName}')/items(${ID})`;
    const response = await spHttpClient.post(updateUrl, SPHttpClient.configurations.v1, {
      headers: {
        Accept: "application/json;odata=nometadata",
        "odata-version": "3.0",
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: JSON.stringify(jsonBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Metadata update failed: ${response.statusText} - ${errText}`);
    }

    console.log(`✅ Metadata updated for item ID: ${ID}`);
    return response;
  } catch (error) {
    console.error("❌ Error updating metadata:", error);
    throw error;
  }
}



export function UpdateItem(WebUrl: string, spHttpClient: SPHttpClient, ListName: string, jsonBody: any, ID: number) {



  if (!jsonBody.__metadata) {
    jsonBody.__metadata = {
      'type': 'SP.ListItem'
    };
  }


  const URL = WebUrl + "/_api/web/lists/getbytitle('" + ListName + "')/Items(" + ID + ")";
  return spHttpClient.post(URL,
    SPHttpClient.configurations.v1, {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'odata-version': '3.0',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'MERGE'
    },
    body: JSON.stringify(jsonBody)
  }).then((response: SPHttpClientResponse) => {
    if (response.ok) {
      return response;
    }
  });

}

export async function getUserIdFromLoginName(context: WebPartContext, loginName: string): Promise<any> {
  const response = await context.spHttpClient.post(
    `${context.pageContext.web.absoluteUrl}/_api/web/ensureuser`,
    SPHttpClient.configurations.v1,
    {
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "odata-version": ""
      },
      body: JSON.stringify({ 'logonName': loginName })
    }
  );

  const userData = await response.json();
  return userData.d;
}


export async function getUserIdOrGroupId(context: WebPartContext, person: any): Promise<any> {
  try {
    // Check if the person is a user
    const userResponse = await context.spHttpClient.get(
      `${context.pageContext.web.absoluteUrl}/_api/web/siteusers?$filter=LoginName eq '${person}'`,
      SPHttpClient.configurations.v1
    );
    const userData = await userResponse.json();

    if (userData.value.length > 0) {
      // It's a user
      return userData.value[0].Id;
    } else {
      // If not a user, check if it's a SharePoint group
      const groupResponse = await context.spHttpClient.get(
        `${context.pageContext.web.absoluteUrl}/_api/web/sitegroups?$filter=Title eq '${person}'`,
        SPHttpClient.configurations.v1
      );
      const groupData = await groupResponse.json();

      if (groupData.value.length > 0) {
        return groupData.value[0].Id;
      }
    }
  } catch (error) {
    console.error("Error fetching user or group ID: ", error);
  }
  return null;
}


/*
export  function UploadFile(WebUrl:any,spHttpClient:SPHttpClient ,file:any,DisplayName:any,DocumentLib:any,jsonBody:any,FolderName:any):Promise<any>  {
  
  let fileupload = DocumentLib +"/"+FolderName;
    return new Promise((resolve) => {      
        const spOpts: ISPHttpClientOptions = {      
            body: file      
        };      
        var redirectionURL = WebUrl + "/_api/Web/GetFolderByServerRelativeUrl('"+fileupload+"')/Files/Add(url='" + DisplayName + "', overwrite=true)?$expand=ListItemAllFields"      
        const response = spHttpClient.post(redirectionURL, SPHttpClient.configurations.v1, spOpts).then((response: SPHttpClientResponse) => {        
           console.log(response);
          response.json().then(async (responseJSON: any) => {        
               // console.log(responseJSON.ListItemAllFields.ID);
              var serverRelURL = await responseJSON.ServerRelativeUrl; 
              console.log(serverRelURL)   
              
               if(jsonBody != null){
                await UpdateItem(WebUrl,spHttpClient,DocumentLib,jsonBody,responseJSON.ListItemAllFields.ID)
            
               }
               resolve(responseJSON); 
            });        
          });    
        });   
    
} */
//export async function UploadFileTR(WebUrl: string, spHttpClient: any, file: File, DisplayName: string | File, DocumentLib: string, jsonBody: { __metadata: { type: string; }; Name: string; LID:any;FileName:string} | null): Promise<any> {
// export async function UploadFileTR(WebUrl: string, spHttpClient: any, file: File, DisplayName: string | File, DocumentLib: string, jsonBody: any): Promise<any> {

//   // let fileupload = DocumentLib +"/"+FolderName;
//   return new Promise((resolve) => {
//     const spOpts: ISPHttpClientOptions = {
//       body: file
//     };
//     var redirectionURL = WebUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + DocumentLib + "')/Files/Add(url='" + DisplayName + "', overwrite=true)?$expand=ListItemAllFields";
//     const responsedata = spHttpClient.post(redirectionURL, SPHttpClient.configurations.v1, spOpts).then((response: SPHttpClientResponse) => {
//       response.json().then(async (responseJSON: any) => {
//         // console.log(responseJSON.ListItemAllFields.ID);
//         var serverRelURL = await responseJSON.ServerRelativeUrl;
//         if (jsonBody != null) {
//           await UpdateItem(WebUrl, spHttpClient, DocumentLib, jsonBody, responseJSON.ListItemAllFields.ID);

//         }
//         resolve(responseJSON);
//         console.log(responsedata);
//         console.log(serverRelURL);
//       });
//     });
//   });

// }

export async function UploadFileTR(
  WebUrl: string,
  spHttpClient: SPHttpClient,
  file: File,
  DisplayName: string,
  DocumentLib: string,
  jsonBody: any
): Promise<any> {
  const spOpts: ISPHttpClientOptions = { body: file };
  const uploadUrl = `${WebUrl}/_api/Web/GetFolderByServerRelativeUrl('${DocumentLib}')/Files/Add(url='${DisplayName}',overwrite=true)?$expand=ListItemAllFields`;

  try {
    const response = await spHttpClient.post(uploadUrl, SPHttpClient.configurations.v1, spOpts);
    const responseJSON = await response.json();
    const listItemId = responseJSON?.ListItemAllFields?.ID;
    //const ListItemEntityName = await WebUrl + `/_api/web/lists/getbytitle('${DocumentLib}')?$select=ListItemEntityTypeFullName`;
    //const entityresponse = await spHttpClient.post(ListItemEntityName, SPHttpClient.configurations.v1, spOpts);


    if (jsonBody) {
      // ✅ Ensure metadata type is correct
      //jsonBody.__metadata = { type: `SP.Data.${DocumentLib}Item` };

      // ✅ Update the list item metadata
      await UpdateFileMetadata(WebUrl, spHttpClient, DocumentLib, jsonBody, listItemId);
    }

    console.log("File uploaded and metadata updated:", responseJSON);
    return responseJSON;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
}

export async function UploadFile(WebUrl: string, spHttpClient: any, file: string, DisplayName: string | File, DocumentLib: string, jsonBody: { __metadata: { type: string; }; Name: string; TileLID: any; DocumentType: string; Documentpath: string; } | null): Promise<any> {

  // let fileupload = DocumentLib +"/"+FolderName;
  return new Promise((resolve) => {
    const spOpts: ISPHttpClientOptions = {
      body: file
    };
    const redirectionURL = WebUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + DocumentLib + "')/Files/Add(url='" + DisplayName + "', overwrite=true)?$expand=ListItemAllFields";
    const responsedata = spHttpClient.post(redirectionURL, SPHttpClient.configurations.v1, spOpts).then(async (response: SPHttpClientResponse) => {
      await response.json().then(async (responseJSON: any) => {
        // console.log(responseJSON.ListItemAllFields.ID);
        const serverRelURL = await responseJSON.ServerRelativeUrl;
        if (jsonBody != null) {
          await UpdateItem(WebUrl, spHttpClient, DocumentLib, jsonBody, responseJSON.ListItemAllFields.ID);

        }
        resolve(responseJSON);
        console.log(responsedata);
        console.log(serverRelURL);
      });
    });
  });

}

export async function SupportUploadFile(WebUrl: string, spHttpClient: any, file: any, DisplayName: string | File, DocumentLib: string, jsonBody: { __metadata: { type: string; }; LID: number; } | null): Promise<any> {

  // let fileupload = DocumentLib +"/"+FolderName;
  return new Promise((resolve) => {
    const spOpts: ISPHttpClientOptions = {
      body: file
    };
    const redirectionURL = WebUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + DocumentLib + "')/Files/Add(url='" + DisplayName + "', overwrite=true)?$expand=ListItemAllFields";
    const responsedata = spHttpClient.post(redirectionURL, SPHttpClient.configurations.v1, spOpts).then(async (response: SPHttpClientResponse) => {
      await response.json().then(async (responseJSON: any) => {
        // console.log(responseJSON.ListItemAllFields.ID);
        const serverRelURL = await responseJSON.ServerRelativeUrl;
        if (jsonBody != null) {
          await UpdateItem(WebUrl, spHttpClient, DocumentLib, jsonBody, responseJSON.ListItemAllFields.ID);

        }
        resolve(responseJSON);
        console.log(responsedata);
        console.log(serverRelURL);
      });
    });
  });

}


export async function UploadITSupport(WebUrl: string, spHttpClient: any, file: string, DisplayName: string | File, DocumentLib: string, jsonBody: { __metadata: { type: string; }; LID: number; } | null): Promise<any> {

  // let fileupload = DocumentLib +"/"+FolderName;
  return new Promise((resolve) => {
    const spOpts: ISPHttpClientOptions = {
      body: file
    };
    const redirectionURL = WebUrl + "/_api/Web/GetFolderByServerRelativeUrl('" + DocumentLib + "')/Files/Add(url='" + DisplayName + "', overwrite=true)?$expand=ListItemAllFields";
    const responsedata = spHttpClient.post(redirectionURL, SPHttpClient.configurations.v1, spOpts).then(async (response: SPHttpClientResponse) => {
      await response.json().then(async (responseJSON: any) => {
        // console.log(responseJSON.ListItemAllFields.ID);
        const serverRelURL = await responseJSON.ServerRelativeUrl;
        if (jsonBody != null) {
          await UpdateItem(WebUrl, spHttpClient, DocumentLib, jsonBody, responseJSON.ListItemAllFields.ID);

        }
        resolve(responseJSON);
        console.log(responsedata);
        console.log(serverRelURL);
      });
    });
  });

}

// export async function DeleteItem(
//   WebUrl: string,
//   spHttpClient: SPHttpClient,
//   ListName: string,
//   ID: number
// ) {
//   const url = `${WebUrl}/_api/web/lists/getbytitle('${ListName}')/items(${ID})`;

//   const response = await spHttpClient.post(
//     url,
//     SPHttpClient.configurations.v1,
//     {
//       method: 'POST', // <-- Required for SPFx delete!
//       headers: {
//         'Accept': 'application/json;odata=nometadata',
//         'Content-Type': 'application/json;odata=nometadata',
//         'IF-MATCH': '*',
//         'X-HTTP-Method': 'DELETE',
//         'odata-version': '' // Must be empty
//       }
//     }
//   );

//   if (!response.ok) {
//     console.error("Delete failed:", response.status, await response.text());
//     throw new Error(`Failed to delete item. Status: ${response.status}`);
//   }

//   return true;
// }

export async function DeleteItem(WebUrl: string, spHttpClient: SPHttpClient, ListName: string, ID: number) {

  const URL = WebUrl + "/_api/web/lists/getbytitle('" + ListName + "')/Items(" + ID + ")";
  return await spHttpClient.post(URL,
    SPHttpClient.configurations.v1, {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'odata-version': '3.0',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'DELETE'
    }
  }).then((response: SPHttpClientResponse) => {
    if (response.ok) {
      return response;
    }
  });

}
function URLBuilder(url: string, options: any) {
  if (options) {
    if (options.filter) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$filter=" + options.filter;
    }
    if (options.select) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$select=" + options.select;
    }
    if (options.orderby) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$orderby=" + options.orderby;
    }
    if (options.expand) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$expand=" + options.expand;
    }
    if (options.top) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$top=" + options.top;
    }
    if (options.skip) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$skip=" + options.skip;
    }
    if (options.skiptoken) {
      url += ((url.indexOf('?') > -1) ? "&" : "?") + "$skiptoken=Paged%3DTRUE%26p_ID%3D" + options.skiptoken;
    }
  }
  return url;
}





