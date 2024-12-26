@@ .. @@
 import { LucideIcon } from 'lucide-react';

 interface ActionCardProps {
   icon: LucideIcon;
   title: string;
   description: string;
   color: string;
   bgColor: string;
   onClick?: () => void;
 }

 const ActionCard = ({ icon: Icon, title, description, color, bgColor, onClick }: ActionCardProps) => {
   return (
     <button 
       onClick={onClick}
       className="w-full group bg-white/90 backdrop-blur-sm rounded-lg p-2.5
                  transition-all duration-300 hover:bg-white hover:shadow-lg
                 hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-olive-500"
     >
       <div className="flex flex-col items-center text-center space-y-1.5">
         <div className={`${bgColor} rounded-full p-2 transition-transform
                         duration-300 group-hover:scale-110`}>
           <Icon className={`w-4 h-4 ${color}`} />
         </div>
         <div>
           <h3 className="text-sm font-medium text-gray-800">
             {title}
           </h3>
           <p className="mt-0.5 text-xs text-gray-600">
             {description}
           </p>
         </div>
       </div>
     </button>
   );
 };