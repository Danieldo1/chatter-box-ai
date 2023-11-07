// import Image from "next/image";
// const Loader = () => {
//   return (
//     <div className="h-full gap-y-4 flex flex-col items-center justify-center">
//         <div className="w-10 h-10 relative animate-spin">
//             <Image 
//             src='/reload.svg'
//             fill
//             alt="loading"
//             />
//         </div>
//         <p className="text-muted-foreground text-sm">ChatterBox is wondering</p>
//     </div>
//   )
// }

// export default Loader

// import React, { useState, useEffect } from 'react';

// function Loader() {
//   const [currentMessage, setCurrentMessage] = useState('');
//   const messages = [
//     "ChatterBox is wondering 🤔",
//     "ChatterBox is excited to help 😃",
//     "ChatterBox is pondering 🤨",
//     "ChatterBox is brainstorming 💡",
//     "ChatterBox is contemplating 🤔",
//     "ChatterBox is daydreaming 😌",
//     "ChatterBox is having a deep thought 🤯",
//     "ChatterBox is exploring ideas 🚀",
//     "ChatterBox is reflecting 🤔",
//     "ChatterBox is meditating 🧘",
//     "ChatterBox is considering options 🤔",
//     "ChatterBox is formulating responses 💬",
//     "ChatterBox is analyzing data 📊",
//     "ChatterBox is feeling creative 🎨",
//     "ChatterBox is brewing up solutions ☕",
//     "ChatterBox is exploring the digital realm 🌐",
//     "ChatterBox is on a knowledge quest 📚",
//     "ChatterBox is in debugging mode 🐞",
//     "ChatterBox is designing the future 🌟",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * messages.length);
//       setCurrentMessage(messages[randomIndex]);
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // Function to get a random message from the array
//   const getRandomMessage = () => {
//     const randomIndex = Math.floor(Math.random() * messages.length);
//     return messages[randomIndex];
//   };

//   return (
//     <div className="h-full gap-y-4 flex flex-col items-center justify-center">
//       <div className="w-10 h-10 relative animate-spin">
//         <Image src='/reload.svg' fill alt="loading" />
//       </div>

//         <p className="text-muted-foreground text-lg">{currentMessage}</p>
  
   
//     </div>
//   );
// }
// export default Loader

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function Loader() {
  const [currentMessage, setCurrentMessage] = useState('');
  const messages = [
    "ChatterBox is wondering 🤔",
    "ChatterBox is excited to help 😃",
    "ChatterBox is pondering 🤨",
    "ChatterBox is brainstorming 💡",
    "ChatterBox is contemplating 🤔",
    "ChatterBox is daydreaming 😌",
    "ChatterBox is having a deep thought 🤯",
    "ChatterBox is exploring ideas 🚀",
    "ChatterBox is reflecting 🤔",
    "ChatterBox is meditating 🧘",
    "ChatterBox is considering options 🤔",
    "ChatterBox is formulating responses 💬",
    "ChatterBox is analyzing data 📊",
    "ChatterBox is feeling creative 🎨",
    "ChatterBox is brewing up solutions ☕",
    "ChatterBox is exploring the digital realm 🌐",
    "ChatterBox is on a knowledge quest 📚",
    "ChatterBox is in debugging mode 🐞",
    "ChatterBox is designing the future 🌟",
  ];

  useEffect(() => {
    // Set initial message
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full gap-y-4 flex flex-col items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image src='/reload.svg' fill alt="loading" />
      </div>

      <p className="text-muted-foreground text-lg">{currentMessage}</p>
    </div>
  );
}

export default Loader;