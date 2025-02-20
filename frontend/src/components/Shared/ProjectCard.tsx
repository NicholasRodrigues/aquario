"use client";

import React from 'react';
import { Inter } from "next/font/google";
import OverlappingImages from './OverlappingImages';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TypeBadge from './Badges';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Share } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import UserCard from './UserCard';

interface User {
    name: string;
    image: string;
    type: "laboratorio" | "pessoa" | "oficial" | "grupo" | "externo";
}
  
interface ProjectCardProps {
    projectName: string;
    projectImage: string;
    users: User[];
}

const inter = Inter({ subsets: ["latin"] });

function ProjectCard({ projectName, projectImage , users}: ProjectCardProps) {

    const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return ( 
        <div id='OuterCard' className='flexbox min-w-[200px] max-w-[350px] min-h-[293.2px] max-h-[293.2px]' >
            {/* REMOVER PADDING */}
            <a href="https://google.com">
                <div className='relative'>
                    <div id='projectImage' className='rounded-xl w-full h-[217px] relative'>
                        <img src={projectImage} alt={projectName} className='h-full w-full rounded-xl absolute inset-0 object-cover' />
                    </div>
                    <div id='projectImageHover' className='w-full h-[217px] flex absolute justify-between items-end inset-0 rounded-xl opacity-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent transition-opacity duration-300 ease-[ease] hover:opacity-100'>
                        <div className='flex w-full'>
                            <div id='textHover' className='flex px-4 pt-5 flex-1 min-w-0'>
                                <p className={`text-white ${inter.className} whitespace-nowrap overflow-hidden text-ellipsis w-full`}>{projectName}</p>
                            </div>

                            <div id='circularTags' className='flex space-x-2 p-4'>
                                <a href="https://google.com.br" target='_blank'>
                                    <div className='bg-white dark:bg-black rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-300 ease-[ease] hover:bg-gray-300'> 
                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                    </div>
                                </a>    
                                    <div className='bg-white dark:bg-black rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-300 ease-[ease] hover:bg-gray-300'>
                                        <Share className="h-4 w-4" />
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </a>

            <div id='projectDetails' className='flex items-center w-full h-[34px] px-1 pt-4 pb-1'>
                <div id='leftArea' className='flex items-center'>
                    <div className=''>
                        <OverlappingImages users={users}></OverlappingImages>
                    </div>
                {users.length === 1 ? (
                    <Dialog>
                    <DialogTrigger className={`pl-2 text-sm ${inter.className}`}>{users[0].name}</DialogTrigger>
                    <DialogContent className='max-w-[500px] h-auto'>
                        <DialogHeader>
                        <DialogTitle className='text-2xl'>Autor do Projeto:</DialogTitle>
                        <DialogDescription>
                            <div className='pt-3'>
                               <UserCard
                                name={users[0].name}
                                profilePicture={users[0].image}
                                major={capitalizeFirstLetter(users[0].type)}
                                type={users[0].type}
                                site=""
                            /> 
                            </div>
                            
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </Dialog>) 
                :
                 (<Dialog>
                    <DialogTrigger className={`pl-2 text-sm ${inter.className} !italic`}>Grupo</DialogTrigger>
                    <DialogContent className="max-w-[500px]">
                        <DialogHeader>
                        <DialogTitle className='text-2xl'>Participantes do Projeto:</DialogTitle>
                        </DialogHeader>
                    <div className='flex-col flex gap-4'>
                    {users.map((user, index) => (
                                      <div key={index}>
                                        <UserCard
                                            key={index}
                                            name={user.name}
                                            profilePicture={user.image}
                                            major={capitalizeFirstLetter(user.type)}
                                            type={user.type}
                                            site=""
                                        />
                                      </div> 
                                    ))}  
                    </div>
                    </DialogContent>
                    </Dialog>
                    )}
                <div className='pl-2 pb-1'>
                        <TypeBadge type={users[0].type} size='small'/>
                </div>
                </div>
                <div id='rightArea' className='flex items-center ml-auto text-gray-400'>
                    <PeopleAltIcon className='w-[22px]'/>
                    <p className='pt-0.5 ml-1 text-base'>{users.length}</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;