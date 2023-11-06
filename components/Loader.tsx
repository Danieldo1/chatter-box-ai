import Image from "next/image";
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

import React, { useState, useEffect } from 'react';

function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const messages = [
    "ChatterBox is wondering",
  "ChatterBox is ready to chat",
  "ChatterBox is excited to help",
  "ChatterBox is feeling chatty",
  "ChatterBox is on standby",
  "ChatterBox is pondering",
  "ChatterBox is brainstorming",
  "ChatterBox is contemplating",
  "ChatterBox is daydreaming",
  "ChatterBox is deep in thought",
  "ChatterBox is exploring ideas",
  "ChatterBox is reflecting",
  "ChatterBox is meditating",
  "ChatterBox is considering options",
  "ChatterBox is formulating responses",
  ];

  

  // Function to get a random message from the array
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  return (
    <div className="h-full gap-y-4 flex flex-col items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image src='/reload.svg' fill alt="loading" />
      </div>

        <p className="text-muted-foreground text-sm">{getRandomMessage()}</p>
  
   
    </div>
  );
}
export default Loader