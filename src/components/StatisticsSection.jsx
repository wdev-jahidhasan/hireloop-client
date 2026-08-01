import React from 'react';
import { BriefcaseBusiness, Building2, Users, Star } from 'lucide-react';

export default function StatisticsSection() {
  const stats = [
    {
      icon: BriefcaseBusiness,
      value: '50K',
      label: 'Active Jobs',
    },
    {
      icon: Building2,
      value: '12K',
      label: 'Companies',
    },
    {
      icon: Users,
      value: '2M',
      label: 'Job Seekers',
    },
    {
      icon: Star,
      value: '97%',
      label: 'Satisfaction Rate',
    },
  ];

  return (
    <section className="relative w-full bg-black text-white flex flex-col justify-end overflow-hidden font-sans">
      
      {/* Background Layer: Full Screen Width & Height */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        
        {/* Glow Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(#2d3c94_0%,#000_65%)] opacity-80 blur-xl"></div>

        {/* World Map Image as Background - Full Screen Width Cover */}
        <div 
          className="absolute inset-0 w-full h-full bg-[url('/images/globe-3.png')] bg-cover bg-top bg-no-repeat opacity-50"
        />

        {/* Subtle Stars Overlay */}
        <div className="absolute inset-0 z-10 opacity-40 bg-[url('/images/stars.png')] bg-repeat"></div>
      </div>

      {/* Content Container: Centered with max-w-7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-24 flex flex-col items-center">
        
        {/* Title/Heading */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-white/90">
            Assisting over <span className="font-bold text-white">15,000 job seekers</span> <br />
            find their dream positions.
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-start gap-6 group transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950"
              >
                {/* Icon Container */}
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:bg-indigo-950/40 group-hover:border-indigo-800 transition-colors">
                  <IconComponent className="w-8 h-8 text-white group-hover:text-indigo-300" strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <div className="space-y-3 mt-auto w-full">
                  <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-md md:text-lg text-zinc-400 font-medium whitespace-nowrap">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}