/* eslint-disable */
import { PrimaryButton } from "@fluentui/react";
import styles from "./Home.module.scss";
import * as React from "react";
// import {
//     Carousel,
//     CarouselButtonsDisplay,
//     CarouselButtonsLocation,
//     CarouselIndicatorShape
// } from '@pnp/spfx-controls-react/lib/Carousel';


// import { Link } from "react-router-dom";



// export interface IHomeProps {
//     onNavigateToReports?: () => void;
// }

interface IHomeProps {
    onNavigate: (page: "home" | "reports") => void;
}

const Home: React.FC<IHomeProps> = ({ onNavigate }) => {
    const logo = require("../../assets/LOGO.png");
    const slider = require("../../assets/BANNERIMAGE.png");
    const featured_image = require("../../assets/Group 16128.png");
    const image = require("../../assets/Group 16129.png");
    const blog1 = require("../../assets/01.png");
    const blog2 = require("../../assets/02.png");
    const blog3 = require("../../assets/03.png");


    return (
        <div className={styles.pageWrapper}>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.leftSection}>
                        <img src={logo} alt="Company Logo" className={styles.logoImage} />
                    </div>

                    <div className={styles.nav}>
                        <span><a href="https://ascenworktech.sharepoint.com/sites/Wizrr365Dev/SitePages/HomeDashboard.aspx" target="_blank" rel="noopener noreferrer">Home</a></span>
                        <span>Overview</span>
                        <span>Dashboard</span>
                        <span><a href="https://ascenworktech.sharepoint.com/sites/Wizrr365Dev/SitePages/AdminPage.aspx" target="_blank" rel="noopener noreferrer">Administration</a></span>
                    </div>

                    <div className={styles.rightSection}>
                        <PrimaryButton
                            text="Login"
                            styles={{
                                root: {
                                    borderRadius: '8px',
                                    padding: '0 20px',
                                    height: '38px'
                                }
                            }}
                        />

                    </div>
                </div>

                {/* <Carousel
                    buttonsLocation={CarouselButtonsLocation.center}
                    buttonsDisplay={CarouselButtonsDisplay.buttonsOnly}
                    contentContainerStyles={styles.carouselImageContent}
                    indicatorShape={CarouselIndicatorShape.rectangle}
                    isInfinite={true}
                    indicators={true}
                    pauseOnHover={true}
                    // element={slider}
                    element={
                        <img
                            src={slider}
                            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
                            alt="Banner"
                        />
                    }
                    prevButtonStyles={styles.prevButtonStyles}
                    nextButtonStyles={styles.nextButtonStyles}
                /> */}

                {/* element={ */}
                <div className={styles.heroBanner}>
                    <img src={slider} className={styles.heroImage} alt="Banner" />

                    <div className={styles.heroOverlay}>
                        <span className={styles.heroBadge}>100% Satisfaction Guarantee</span>
                        <h1>Start Your Learning Journey Today</h1>
                        <p>
                            Grow with our comprehensive online learning platform. Advance
                            your career and explore new interests.
                        </p>
                    </div>
                </div>
                {/* // } */}



                {/* <div className="card card-xl-stretch" style={{ height: "100%" }}>
                <div style={{ padding: "20px 15px 9px 15px" }}>

                </div>

                <div className="card-body" style={{ padding: "9px 15px" }}>
                    <div>


                        <div className="row ">
                            <div className="col-sm-8">
                                <img
                                    src={featured_image}
                                // alt={article.Article_Title}
                                // className={styles.articleImage}
                                />
                            </div>


                            <div className="col-sm-8" style={{ paddingLeft: "20px" }}>
                                <div className="flex-grow-1">
                                    <span className={styles.articlecategoryBadge}>Get To Know About Us</span>
                                    <span className={styles.articleTitle} style={{ cursor: "pointer", textDecoration: "none" }}>Discover Our Online Learning Programs</span>
                                    <span>
                                        <p className={styles.articleExcerpt}>Dive into a reach array of forces meticulously crafted to cater to your educational aspirational expiration and professional growth explore divers subject from business</p>
                                    </span>
                                    <PrimaryButton
                                        // to={`/ViewFullArticles?id=${article.ID}`}
                                        className={styles.articlereadMoreButton}
                                        // onClick={() => onNavigate("reports")}
                                        onClick={() => onNavigate("reports")}
                                        style={{ cursor: 'pointer' }}
                                        text='Discover More' />

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}

                <div className={styles.section} style={{ backgroundColor: '#fff' }}>
                    <div className={styles.sectionContent}>
                        <div className={styles.imageContainer}>
                            <img src={featured_image} alt="Learning Programs" />
                        </div>

                        <div className={styles.textContainer}>
                            <span className={styles.badge}>Get To Know About Us</span>
                            <h2>Discover Our Online Learning Programs</h2>
                            <p>
                                Dive into a rich array of courses meticulously crafted to support
                                your educational and professional growth.
                            </p>

                            <PrimaryButton
                                text="Discover More"
                                onClick={() => onNavigate("reports")}
                                className={styles.primaryBtn}
                            />
                        </div>
                    </div>
                </div>


                {/* Hero Section */}
                {/* <div className={styles.hero}>
                <div className={styles.heroLeft}>
                    <h1>Welcome to Our Website</h1>
                    <p>
                        This is your assessment homepage created using SPFx and Fluent UI.
                    </p>
                    <div className={styles.buttonGroup}>
                        <PrimaryButton text="Get Started" />
                        <DefaultButton text="Learn More" />
                    </div>
                </div>

                <div className={styles.heroRight}>
                    <div className={styles.imagePlaceholder}>
                        Image Placeholder
                    </div>
                </div>
            </div> */}

                {/* <div className={styles.featuresSection}>
                <h2>Our Services</h2>

                <div className={styles.features}>
                    <div className={styles.featureCard}>
                        <h3>Consulting</h3>
                        <p>We provide expert consulting solutions.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <h3>Technology</h3>
                        <p>Innovative digital transformation services.</p>
                    </div>

                    <div className={styles.featureCard}>
                        <h3>Support</h3>
                        <p>24/7 enterprise-grade support systems.</p>
                    </div>
                </div>
            </div> */}

                {/* <div className="card card-xl-stretch" style={{ height: "100%" }}>
                <div style={{ padding: "20px 15px 9px 15px" }}>

                </div>

                <div className="card-body" style={{ padding: "9px 15px" }}>
                    <div>


                        <div className="row ">



                            <div className="col-sm-8" >
                                <div className="flex-grow-1">
                                    <span className={styles.articlecategoryBadge}>Get To Know About Us</span>
                                    <span className={styles.articleTitle} style={{ cursor: "pointer", textDecoration: "none" }}>Find Your Path With Our Online Courses</span>
                                    <span>
                                        <p className={styles.articleExcerpt}>Embark on a personalised journey of growth and discovery with our online courses, whether you are choosing a new career path. Seeking to expand your skills.</p>
                                    </span>
                                    <PrimaryButton
                                        // to={`/ViewFullArticles?id=${article.ID}`}
                                        className={styles.articlereadMoreButton}
                                        // onClick={() => onNavigate("reports")}
                                        onClick={() => onNavigate("reports")}
                                        style={{ cursor: 'pointer' }}
                                        text='Discover More' />

                                </div>
                            </div>

                            <div className="col-sm-8" style={{ paddingLeft: "20px" }}>
                                <img
                                    src={image}
                                // alt={article.Article_Title}
                                // className={styles.articleImage}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}

                <div className={styles.blogSection}>
                    <div className={styles.blogHeader}>
                        <span className={styles.blogSubtitle}>Get To Know About Us</span>
                        <h2>Our Latest News & Blog</h2>
                        <p>
                            Explore insightful articles, industry trends, and exciting updates curated just for you.
                        </p>
                    </div>

                    <div className={styles.blogCards}>
                        <div className={styles.blogCard}>
                            <img src={blog1} alt="Blog 1" />
                            <span className={styles.blogCategory}>Business</span>
                            <h3>Top 10 Skills to Thrive in the Digital Age</h3>
                            <span className={styles.blogMeta}>By John | August 25, 2023</span>
                        </div>

                        <div className={styles.blogCard}>
                            <img src={blog2} alt="Blog 2" />
                            <span className={styles.blogCategory}>Finance</span>
                            <h3>Navigating the Future of Remote Learning</h3>
                            <span className={styles.blogMeta}>By Natasha | June 12, 2023</span>
                        </div>

                        <div className={styles.blogCard}>
                            <img src={blog3} alt="Blog 3" />
                            <span className={styles.blogCategory}>Data Science</span>
                            <h3>What Leonardo Teach us About Web Design</h3>
                            <span className={styles.blogMeta}>By William | July 20, 2023</span>
                        </div>
                    </div>
                </div>


                <div className={`${styles.section} ${styles.reverse}`}>
                    <div className={styles.sectionContent}>
                        <div className={styles.imageContainer}>
                            <img src={image} alt="Online Courses" />
                        </div>

                        <div className={styles.textContainer}>
                            <span className={styles.badge}>Get To Know About Us</span>
                            <h2>Find Your Path With Our Online Courses</h2>
                            <p>
                                Embark on a personalised journey of growth and discovery with our
                                online courses.
                            </p>

                            <PrimaryButton
                                text="Discover More"
                                onClick={() => onNavigate("reports")}
                                className={styles.primaryBtn}
                            />
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Home;

