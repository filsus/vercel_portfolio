"use client";
import React, { useState, useEffect, useRef } from 'react';
import Timeline from "./Timeline";
import Skills from"./Skills";

const TabbedContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionInView(true);
          } else {
            setIsSectionInView(false);
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);


  const renderContent = () => {
    switch (activeTab) {
      case 'Experience & Education':
        return <Timeline/>;
      case 'Skills':
        return <Skills/>;
      default:
        return <Timeline/>;
    }
  };

  return (
    <div id='about'>
      <div className="flex gap-10 justify-center py-24">
        {['Experience & Education', 'Skills'].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer ${activeTab === tab ? 'text-green-300' : 'text-white'}`}
            onMouseEnter={(e) => e.currentTarget.classList.add('font-bold')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('font-bold')}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="mt-4 relative ">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabbedContent;
