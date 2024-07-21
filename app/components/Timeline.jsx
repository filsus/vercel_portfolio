import React, {useState} from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const experiences = [
  {
    title: 'Pipeline TD / VFX Compositor',
    company_name: 'Fix FX Glasgow',
    icon: '/images/company/fix.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2022 - Present',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://www.fixfx.uk/"
  },
  {
    company_name: 'Actively started developing Shotgun/Shotgrid/Flow PT based pipelines.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2022',
    color: "#121212"
  },
  {
    title: 'MSC Artificial Inteligence for Media',
    company_name: 'Masters degree at Bournemouth University',
    icon: '/images/company/bu.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2022 - Sep 2023',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://www.bournemouth.ac.uk/"
  },
  {
    company_name: 'Actively started developing AI/ML based applications and tools.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Jun 2022',
    color: "#121212"
  },
  {
    title: 'VFX Compositor',
    company_name: 'RodeoFX Munich',
    icon: '/images/company/rodeo.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2021 - Oct 2022',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://www.rodeofx.com/"
  },
  {
    title: 'I/O operator and 2D Assistant',
    company_name: 'GlassWorks London',
    icon: '/images/company/glassworks.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Jun 2021 - Sep 2021',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://glassworksvfx.com/"
  },
  {
    title: 'VFX Compositor',
    company_name: 'Triton Digital Bratislava',
    icon: '/images/company/triton.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Feb 2021 - Mar 2021',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://www.triton.digital/"
  },
  {
    title: 'VFX Compositor',
    company_name: 'GlassWorks London',
    icon: '/images/company/glassworks.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2020 - Dec 2020',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://glassworksvfx.com/"
    
  },
  {
    company_name: 'Actively started developing Python based applications and tools.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2020',
    color: "#121212"
  },
  {
    title: 'Compozitive Academy',
    company_name: 'Online VFX Compositing Academy',
    icon: '/images/company/compozitive.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Aug 2019 - Present',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://compozitive.com/sk"
  },
  {
    company_name: 'Actively started compositing using Nuke.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Jan 2019',
    color: "#121212"
  },
  {
    title: 'BA Film Visual Effects',
    company_name: 'Bachelors degree at Solent University',
    icon: '/images/company/solent.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2018 - Jun 2021',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://www.solent.ac.uk/"
  },

];

const ExperienceCard = ({ experience }) => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);

  const toggleParagraphVisibility = () => {
    setIsParagraphVisible(!isParagraphVisible);
  };

  return (
    <VerticalTimelineElement
    
    visible={true}
    contentStyle={{
      background: '#121212',
      boxShadow: `${experience.color} 0px 5px 0px`,
    }}
    contentArrowStyle={{
      borderRight: '7px solid',
      color: experience.color
    }}
    date={experience.date}
    dateClassName='text-white'
    iconStyle={{ background: '#101010', boxShadow: 'none' }}
    icon={
      
      <div className="flex justify-center items-center w-full h-full">
        <a href={experience.href} className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[75%] h-[75%] object-contain"
          />
        </a>
      </div>

    }
  >
    <div>
      <p
        className="text-[22px] tracking-[1px] text-gray-400"
        style={{ margin: 0 }}
      >
        {experience.company_name}
      </p>
      <h3 className="text-[24px] font-bold tracking-[2px]">
        {experience.title}
      </h3>

      <div>
      {experience.title && (
        <div className="flex justify-end">
          <button onClick={toggleParagraphVisibility} className="text-gray-600">
            {isParagraphVisible ? 'see less ↑' : 'see more ↓'}
          </button>
        </div>
      )}
      {isParagraphVisible && (
        <p className="mt-2 text-center text-gray-600">
          {experience.description}
        </p>
      )}
    </div>
    </div>
  </VerticalTimelineElement>
  );
};

const Timeline = () => {
  return (
    <section>
      <h1 className="text-2xl sm:text-2xl lg:text-4xl lg:leading-normal font-extrabold text-center py-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
          MY VFX JOURNEY
        </span>
      </h1>
      <h2 className="text-[#ADB7BE] text-base sm:text-lg mb-12 py-4 lg:text-xl text-center">Milestones, Work Experience, and Education: Explore the Chronological Timeline Below!</h2>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="" lineColor="#121212" animate={true}>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Timeline;
