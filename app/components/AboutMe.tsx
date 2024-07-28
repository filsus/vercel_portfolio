"use client";
import React, { useState, useEffect, useRef } from 'react';
import Timeline from "./Timeline";
import Skills from"./Skills";

const TabbedContent: React.FC = () => {

  return (
    <div id='about'>
      <div className="mt-4 relative ">
        <Timeline/>
      </div>
    </div>
  );
};

export default TabbedContent;
