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
    href: "https://www.fixfx.uk/",
    description: <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Developed a distributed Shotgrid-based pipeline, integrating Shotgrid, Nuke, Deadline, Google Sheets, and Discord for streamlined data flow.</li><br></br>
        <li>Created a unified show setup toolset, automating data flow from initial ingest to delivery.</li><br></br>
        <li>Implemented various tools, workflows, and templates for artists and production to automate repetitive tasks.</li>
    </ul>
</div>


  },
  {
    title: 'Actively started developing Shotgun/Shotgrid/Flow PT based pipelines.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2022',
    color: "#121212"
  },
  {
    title: 'MSC Artificial Inteligence for Media',
    company_name: 'Bournemouth University',
    icon: '/images/company/bu.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2022 - Sep 2023',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://www.bournemouth.ac.uk/",
    description: <div class="p-4 font-light">
        <ul class="list-disc list-inside">
            <li>Learned various machine learning methods like regression, classification, clustering, and neural networks.</li><br></br>
            <li>Worked with machine learning libraries such as NumPy, PyTorch, Keras, OpenCV, SciPy, scikit-learn, Matplotlib, Pandas, and more.</li><br></br>
            <li>Experimented in computer vision and acquired a deep understanding of inpainting/outpainting, NeRFs/Gaussian splats, segmentation/object detection, classification, image retrieval, and image registration.</li><br></br>
            <li>Graduated with distinction.</li>
        </ul>
    </div>
    
  },
  {
    title: 'Actively started developing AI/ML based applications and tools.',
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
    href: "https://www.rodeofx.com/",
    description: <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Part of a small team that won a <a href='https://deadline.com/2023/02/ves-awards-2023-winners-list-1235261199/' className='font-semibold underline'>VES award for Outstanding Compositing & Lighting in an Episode</a>.</li><br></br>
        <li>Fulfilled my tasks as a Nuke Compositor with several teams on various film and TV series.</li>
    </ul>
</div>


  },
  {
    title: 'I/O operator and 2D Assistant',
    company_name: 'GlassWorks London',
    icon: '/images/company/glassworks.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Jun 2021 - Sep 2021',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://glassworksvfx.com/",
    description: <div class="p-4 font-light">
    <ul class="list-disc list-inside ">
        <li>Managed typical editorial and QC responsibilities, archiving, data management, ingestion, and show setup.</li><br></br>
        <li>Worked as a 2D compositing assistant on various commercial and fast-paced projects.</li><br></br>
        <li>Improved and simplified the pipeline, used a ticketing system for issue tracking, and wrote in-house documentation for various processes.</li>
    </ul>
</div>

  },
  {
    title: 'VFX Compositor',
    company_name: 'Triton Digital Bratislava',
    icon: '/images/company/triton.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Feb 2021 - Mar 2021',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://www.triton.digital/",
    description:  <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Worked as a freelance Nuke compositor on multiple fast-paced commercials.</li>
    </ul>
    </div>
  },
  {
    title: 'VFX Compositor',
    company_name: 'GlassWorks London',
    icon: '/images/company/glassworks.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Oct 2020 - Dec 2020',
    color: "rgba(0, 200, 100, 0.5)",
    href: "https://glassworksvfx.com/",
    description:  <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Worked as a freelance Roto/Prep artist for a <a href='https://www.youtube.com/watch?v=9vMLTcftlyI' className='font-semibold underline'>commercial project</a>.</li>
    </ul>
    </div>
    
  },
  {
    title: 'Actively started developing Python based applications and tools.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2020',
    color: "#121212"
  },
  {
    company_name: 'Compozitive',
    title: 'Online VFX Compositing Academy',
    icon: '/images/company/compozitive.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Aug 2019 - Present',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://compozitive.com/sk",
    description: <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Learned various compositing techniques such as roto/prep, 2D tracking, 2.5D workflow, CG compositing, deep compositing under the supervision of Senior Nuke Compositor, Vladimir Valovic.</li><br></br>
        <li>Created a body of work for our <a href="https://www.youtube.com/watch?v=2KTl8XL9v_Q" class="font-semibold underline">showreel</a>, with the support of aspiring VFX Artists.</li>
    </ul>
</div>

    
  },
  {
    title: 'Actively started compositing using Nuke.',
    icon: '/images/milestone.svg', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Jan 2019',
    color: "#121212"
  },
  {
    title: 'BA Film Visual Effects',
    company_name: 'Solent University',
    icon: '/images/company/solent.png', // Add icon URL here if available
    iconBg: '#333333',
    date: 'Sep 2018 - Jun 2021',
    color: "rgba(0, 100, 200, 0.5)",
    href: "https://www.solent.ac.uk/",
    description: <div class="p-4 font-light">
    <ul class="list-disc list-inside">
        <li>Bachelor&apos;s degree in VFX for Film.</li><br></br>
        <li>Acquired a full understanding of the VFX pipeline and explored various disciplines within the realm.</li><br></br>
        <li>Completed a final major project specializing in Nuke compositing, which was awarded the <a href='https://www.therookies.co/entries/13327' className='font-semibold underline'>Rookies finalist award</a>.</li><br></br>
        <li>Graduated with distinction.</li>
    </ul>
    </div>
    
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
    dateClassName='text-gray-200'
    iconStyle={{ background: '#101010', boxShadow: 'none' }}
    icon={
      
      <div className="flex justify-center items-center w-full h-full">
        <a href={experience.href} className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[75%] h-[75%] object-contain "
          />
        </a>
      </div>

    }
  >
    <div>
      <p
        className="text-[22px] tracking-[1px] text-gray-500"
      >
        {experience.title}
      </p>
      <h3 className="text-[24px] font-bold tracking-[2px]">
        {experience.company_name}
      </h3>

      <div>
      {experience.company_name && (
        <div className="flex justify-end">
          <button onClick={toggleParagraphVisibility} className="text-gray-500 font-semibold text-xs">
            {isParagraphVisible ? 'see less ↑' : 'see more ↓'}
          </button>
        </div>
      )}
      {isParagraphVisible && (
        <p className="mt-2 text-left text-gray-200">
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
          EXPERIENCE & EDUCATION
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
