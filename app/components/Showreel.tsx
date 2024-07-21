"use client";
import React, { useState } from 'react';

const VimeoVideo: React.FC = () => {
  const [videoId, setVideoId] = useState('954534787');
  const [selectedYear, setSelectedYear] = useState('2023');

  const handleYearClick = (year: string) => {
    const videoIds: { [key: string]: string } = {
      '2020': '564964717',
      '2021': '583779160',
      '2023': '954534787'
    };
    setVideoId(videoIds[year])
    setSelectedYear(year);
  };

  const videoUrl = `https://player.vimeo.com/video/${videoId}`;

  return (
<section>
  <div className='' id='showreel'>
    <h1 className="text-2xl sm:text-2xl lg:text-4xl lg:leading-normal font-extrabold text-center py-8">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
        SHOWREEL
      </span>
    </h1>
    <h2 className="text-[#ADB7BE] text-base sm:text-lg mb-12 py-4 lg:text-xl text-center">
      VFX Compositing Showreel: Project Highlights & Breakdowns! Check out other areas of my work in the Projects Section.
    </h2>
    <div className="flex space-x-4 mb-2 justify-center">
      {['2020', '2021', '2023'].map(year => (
        <span
          key={year}
          onClick={() => handleYearClick(year)}
          className={`cursor-pointer text-1xl ${selectedYear === year ? 'text-green-300' : 'text-white'} hover:font-bold`}
        >
          {year}
        </span>
      ))}
    </div>
    <div style={{
      position: "relative",
      overflow: "hidden",
      paddingTop: "56.25%", // 16:9 aspect ratio (adjust as needed)
    }} className='py-48'>
      <iframe
        src={videoUrl}
        width="640"
        height="360"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      ></iframe>
    </div>
  </div>
</section>

  );
}

export default VimeoVideo;
