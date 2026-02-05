import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import HomeDashboard from './components/HomeDashboard';
// import { IHomeDashboardProps } from './components/IHomeDashboardProps';

export interface IHomeDashboardWebPartProps {
  description: string;
}

export default class HomeDashboardWebPart
  extends BaseClientSideWebPart<IHomeDashboardWebPartProps> {



  protected onInit(): Promise<void> {
    return Promise.resolve();
  }


  public render(): void {
    const element = React.createElement(HomeDashboard, {
      webUrl: this.context.pageContext.web.absoluteUrl,
      spHttpClient: this.context.spHttpClient
    });

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Home Dashboard Settings"
          },
          groups: [
            {
              groupName: "General",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
