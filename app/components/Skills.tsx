import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceManyBody } from 'd3-force';

  // Define nodeCanvasObject constant
  const nodeCanvasObject = (node, ctx, globalScale) => {
    // Calculate text width and height
    const fontSize = node.fontSize / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(node.name).width + 10;
    const textHeight = fontSize + 10;
    const circleRadius = 10;

    // Adjust the saturation of the circle color
    let circleColor =  adjustSaturation(node.nodeColor, node.saturation) || '#121212';

    // Draw circle in front of the text
    ctx.beginPath();
    ctx.arc(node.x - textWidth / 2 - circleRadius - 5, node.y, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = circleColor;
    ctx.fill();

    // Draw text label
    ctx.fillStyle = '#040404'; // Background color for the text label background
    ctx.fillRect(node.x - textWidth / 2, node.y - textHeight / 2, textWidth, textHeight);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = node.color || '#000000'; // Text color
    ctx.fillText(node.name, node.x, node.y);

    // Draw image/icon to the right of the text
    const imageWidth = 40;
    const imageHeight = 40;
    const img = new Image();
    img.src = node.image || ""; // Replace with your image source
    ctx.drawImage(img, node.x + textWidth / 2 + 5, node.y - imageHeight / 2, imageWidth, imageHeight);
  };

  // Define nodePointerAreaPaint constant
  const nodePointerAreaPaint = (node, color, ctx, globalScale) => {
    const fontSize = node.fontSize / globalScale;
    const textWidth = ctx.measureText(node.name).width + 10;
    const textHeight = fontSize + 10;
    const padding = 10; // Padding around the text and image/icon

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(
      node.x - (textWidth / 2 + padding),
      node.y - (textHeight / 2 + padding),
      textWidth + 2 * padding,
      textHeight + 2 * padding
    );
    ctx.fill();
  };


function adjustSaturation(originalColor, saturation) {
  // Validate originalColor format (assuming it's a valid CSS color)
  const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  if (!hexRegex.test(originalColor)) {    
    return '#000000'; // Default to black for invalid color format
  }

  // Parse originalColor into RGB components
  const parseHex = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  };

  const rgb = parseHex(originalColor);

  // Calculate desaturated RGB values
  const desaturate = (value) => value + (255 - value) * (1 - saturation);
  const desaturatedColor = {
    r: desaturate(rgb.r),
    g: desaturate(rgb.g),
    b: desaturate(rgb.b)
  };

  // Convert desaturated RGB back to hex
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const desaturatedHex = `#${toHex(Math.round(desaturatedColor.r))}${toHex(Math.round(desaturatedColor.g))}${toHex(Math.round(desaturatedColor.b))}`;

  return desaturatedHex;
}

const Skills: React.FC = () => {

  const graphData = {
    nodes: [
      { id: 'coding', name: 'DEVELOPER', size: 20, color: 'white', image:'/images/coding.svg', nodeColor: "#000099", fontSize: 36, saturation:1 }, // Big node
      { id: 'vfx', name: 'ARTIST', size: 20, color: 'white', image:'/images/artist.svg', nodeColor: "#009900", fontSize: 36, saturation:1 }, // Big node
      { id: 'editorial', name: 'Editorial', size: 36, color: 'white',nodeColor: "#990000", fontSize: 18, saturation:1, x: 400, y: 100, fx: 400, fy: 100 },

      ///
      { id: 'nuke', name: 'Nuke/NukeX', size: 15, color: 'white', fontSize:18,nodeColor: "#009900", saturation:1  }, // Small node
      { id: 'adobe', name: 'Adobe', size: 15, color: 'white', fontSize:18,nodeColor: "#009900", saturation:1 },
      { id: 'mocha', name: 'Mocha', size: 15, color: 'white', fontSize:18,nodeColor: "#009900", saturation:0.8  },
      { id: 'autodesk', name: 'Autodesk', size: 15, color: 'white', fontSize:18,nodeColor: "#009900", saturation:0.35  },
      // Extra nodes linked to node5
      { id: 'maya', name: 'Maya', size: 15, color: 'white', fontSize:12,nodeColor: "#009900", saturation:0.25  },
      { id: 'rv', name: 'RV', size: 15, color: 'white', fontSize:18,nodeColor: "#005555", saturation:1  },
      { id: 'flow', name: 'Shotgrid/Flow PT', size: 10, color: 'white', fontSize:18,nodeColor: "#005555", saturation:1  },
      // Extra nodes linked to node5
      { id: 'photoshop', name: 'Photoshop', size: 12, color: 'white', fontSize:10,nodeColor: "#009900", saturation:1 },
      { id: 'premiere', name: 'Premiere', size: 12, color: 'white', fontSize:10,nodeColor: "#009900", saturation:1 },
      { id: 'media', name: 'Media Encoder', size: 12, color: 'white', fontSize:10,nodeColor: "#009900", saturation:1 },

      { id: 'os', name: 'OS', size: 10, color: 'white', fontSize:24,nodeColor: "#040404", saturation:1},
      { id: 'windows', name: 'Windows', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1 },
      { id: 'mac', name: 'Mac', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.25 },
      { id: 'linux', name: 'Linux', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.75 },

      { id: 'git', name: 'Github', size: 10, color: 'white', fontSize:20,nodeColor: "#000099", saturation:0.9  },
      
      { id: 'javascript', name: 'Javascript', size: 10, color: 'white', fontSize:14,nodeColor: "#000099", saturation:0.25 },      
      { id: 'nodejs', name: 'NodeJS', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.25 },
      { id: 'react', name: 'React', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.25 },
      { id: 'css', name: 'CSS', size: 10, color: 'white', fontSize:14,nodeColor: "#000099", saturation:1 },
      { id: 'tailwind', name: 'Tailwind', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.25 },
      { id: 'html', name: 'HTML', size: 10, color: 'white', fontSize:14,nodeColor: "#000099", saturation:0.75},
      { id: 'front', name: 'Front - End', size: 10, color: 'white', fontSize:24,nodeColor: "#000099", saturation:0.25, x: 200, y: -100, fx: 200, fy: -100 },

      { id: 'ml', name: 'Machine Learning', size: 10, color: 'white', fontSize:24,nodeColor: "#000099", saturation:0.25    },
      { id: 'integrate', name: 'Integrations', size: 10, color: 'white', fontSize:12,nodeColor: "#040404", saturation:1    },
      { id: 'pipe', name: 'Pipeline', size: 10, color: 'white', fontSize:24,nodeColor: "#000099", saturation:1, x: 200, y: 100, fx: 200, fy: 100},
      { id: 'pyqt', name: 'PyQt/Pyside', size: 10, color: 'white', fontSize:16,nodeColor: "#000099", saturation:1  },
      { id: 'nim', name: 'NIM', size: 10, color: 'white',fontSize:12,nodeColor: "#009900", saturation:0.7  },
      { id: 'discord', name: 'Discord', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'nukeapi', name: 'Nuke/Hiero API', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'google', name: 'Google Sheets', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },      
      { id: 'sgtk', name: 'sgtk', size: 10, color: 'white' },
      { id: 'flow_python', name: 'Python API', size: 10, color: 'white',  fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'daemon', name: 'Event Daemon/Webhooks', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'config', name: 'Configuration Management', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'hooks', name: 'Apps & Hooks', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'status', name: 'Status Automation', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:1  },
      { id: 'studio', name: 'Nuke Studio/Hiero', size: 10, color: 'white' },
      { id: 'deadline', name: 'Deadline', size: 10, color: 'white', fontSize:18,nodeColor: "#000099", saturation:0.75  },

      { id: 'ingestion', name: 'Ingestion', size: 10, color: 'white', fontSize:12,nodeColor: "#990000", saturation:0.8  },
      { id: 'delivery', name: 'Delivery', size: 10, color: 'white', fontSize:12,nodeColor: "#990000", saturation:1  },
      { id: 'color', name: 'Color', size: 10, color: 'white', fontSize:12,nodeColor: "#990000", saturation:0.65   },
      { id: 'review', name: 'Review', size: 10, color: 'white', fontSize:12,nodeColor: "#990000", saturation:0.65   },
      { id: 'archive', name: 'Archiving', size: 10, color: 'white', fontSize:12,nodeColor: "#990000", saturation:1 },

      { id: 'apis', name: 'APIs', size: 10, color: 'white', fontSize:18,nodeColor: "#000099", saturation:0.6 },
      { id: 'numpy', name: 'Numpy', size: 10, color: 'white' , fontSize:12,nodeColor: "#000099", saturation:1},
      { id: 'scikit', name: 'Scikit', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.5 },
      { id: 'pytorch', name: 'Pytorch', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.75 },
      { id: 'pandas', name: 'Pandas', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:1 },
      { id: 'opencv', name: 'OpenCV', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:1 },
      { id: 'inpaint', name: 'Inpainting/Outpainting', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.9  },
      { id: 'image', name: 'Image Retrieval/Segmentation/Registration', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.6  },
      { id: 'nerf', name: 'NeRFs/Gaussian Splatting', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.2 },
      { id: 'sd', name: 'Stable Diffusion', size: 10, color: 'white' , fontSize:16,nodeColor: "#000099", saturation:0.75 },
      { id: 'comfyui', name: 'ComfyUI', size: 10, color: 'white', fontSize:10,nodeColor: "#000099", saturation:0.75  },
      { id: 'vision', name: 'Computer Vision', size: 10, color: 'white', fontSize:16,nodeColor: "#000099", saturation:0.35 },
      { id: 'model', name: 'training/testing/eval', size: 10, color: 'white', fontSize:12,nodeColor: "#000099", saturation:0.65  },
    ],
    links: [
      { source: 'coding', target: 'vfx', distance: 200 }, // Set link distance between node1 and node2 to 200
      { source: 'status', target: 'integrate', distance: 150 },
      { source: 'editorial', target: 'pipe', distance: 150 },
      { source: 'config', target: 'integrate', distance: 150 },
      { source: 'hooks', target: 'integrate', distance: 150 },
      { source: 'daemon', target: 'integrate', distance: 150 },
      { source: 'deadline', target: 'pipe', distance: 150 },
      { source: 'pyqt', target: 'coding', distance: 150 },
      { source: 'comfyui', target: 'sd', distance: 200 },
      { source: 'autodesk', target: 'vfx', distance: 200 },
      { source: 'maya', target: 'autodesk', distance: 200 },
      { source: 'rv', target: 'autodesk', distance: 200 },
      { source: 'flow', target: 'autodesk', distance: 300 },
      { source: 'nuke', target: 'vfx', distance: 100 },
      { source: 'mocha', target: 'vfx', distance: 100 },
      { source: 'adobe', target: 'vfx', distance: 100 },
      { source: 'front', target: 'coding', distance: 100 },
      { source: 'os', target: 'coding', distance: 100 },
      { source: 'linux', target: 'os'},
      { source: 'mac', target: 'os'},
      { source: 'windows', target: 'os'},
      { source: 'pipe', target: 'coding'},

      { source: 'nuke', target: 'flow'},
      { source: 'sd', target: 'nuke'},
      { source: 'review', target: 'editorial'},
      { source: 'integrate', target: 'flow'},

      { source: 'apis', target: 'ml'},
      { source: 'model', target: 'pytorch', distance: 50 },
      { source: 'vision', target: 'ml', distance: 50 },
      { source: 'sd', target: 'vision', distance: 50 },
      { source: 'nerf', target: 'vision', distance: 50 },
      { source: 'image', target: 'vision', distance: 100 },
      { source: 'inpaint', target: 'vision', distance: 150 },
      { source: 'opencv', target: 'apis', distance: 50 },
      { source: 'pandas', target: 'apis', distance: 50 },
      { source: 'scikit', target: 'apis', distance: 50 },
      { source: 'pytorch', target: 'apis', distance: 50 },
      { source: 'numpy', target: 'apis', distance: 50 },
      { source: 'nuke', target: 'pipe', distance: 50 },


      { source: 'photoshop', target: 'adobe', distance: 50 },
      { source: 'premiere', target: 'adobe', distance: 50 },
      { source: 'media', target: 'adobe', distance: 50 },
      { source: 'flow', target: 'pipe', distance: 300 },
      { source: 'nim', target: 'vfx', distance: 150 },
      { source: 'archive', target: 'editorial', distance: 50 },
      { source: 'ingestion', target: 'editorial', distance: 50 },
      { source: 'delivery', target: 'editorial', distance: 50 },
      { source: 'rv', target: 'flow', distance: 50 },
      { source: 'discord', target: 'integrate', distance: 150 },
      { source: 'google', target: 'integrate', distance: 150 },
      { source: 'color', target: 'editorial', distance: 50 },
      { source: 'nodejs', target: 'javascript', distance: 50 },
      { source: 'react', target: 'javascript', distance: 50 },
      { source: 'tailwind', target: 'css', distance: 50 },
      { source: 'html', target: 'front', distance: 50 },
      { source: 'css', target: 'front', distance: 50 },
      { source: 'javascript', target: 'front', distance: 50 },
      { source: 'git', target: 'coding', distance: 200 },
      { source: 'ml', target: 'coding', distance: 100},
    ]
  };

  const graphRef = useRef<any>(null)
  const graphWrapperRef = useRef(null);

  // IntersectionObserver setup

  // Initial setup and configuration of the force graph
  useEffect(() => {
    const fg = graphRef.current;

    // Adjust graph settings here if needed
    fg.d3Force('link').distance((link) => link.distance || 35); // Adjust link distances
    fg.d3Force('charge', forceManyBody().strength(-650)); // Adjust node repulsion

 }, []);


  return (
<section className='min-h-[2000px]'>
            <div className='relative z-20  bg-[#040404] rounded-lg shadow-lg p-8 mx-auto '>
            <h1 className="text-2xl sm:text-2xl lg:text-4xl lg:leading-normal font-extrabold text-center py-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                  SKILLS
                </span>
              </h1>
              <h2 className="text-[#ADB7BE] text-base sm:text-lg mb-12 py-4 lg:text-xl text-center">My straightforward yet intricate presentation of acquired skills.</h2>
                        
            </div>
              
      <div ref={graphWrapperRef} className='inset-0'>
        {typeof window !== 'undefined' && (
          <ForceGraph2D
            ref={graphRef}
            cooldownTime={Infinity}
            graphData={graphData}
            nodeLabel="name"
            linkColor={() => '#454545'}
            enableZoomInteraction={false}
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={nodePointerAreaPaint}
            autoPauseRedraw={false}
            warmupTicks={200}
            height={2000}
          />
        )}
      </div>
          </section>
  );
};

export default Skills;
