export const playIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
};

export const pauseIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="M304 176h80v672h-80zm408 0h-64c-4.4 0-8 3.6-8 8v656c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V184c0-4.4-3.6-8-8-8z"></path></svg>`;
};

export const volumeHighIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></path><path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"></path></svg>`;
};

export const volumeMuteIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path></svg>`;
};

export const fullScreenIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="M174 64h-58.8C78.1 64 48 94.1 48 131.2V190c0 7.7 6.3 14 14 14s14-6.3 14-14v-59.8c0-9.1 4.3-18.7 11.7-26.2 7.5-7.6 17.2-12 26.5-12H174c7.7 0 14-6.3 14-14s-6.3-14-14-14zM397.8 64H338c-7.7 0-14 6.3-14 14s6.3 14 14 14h59.8c9.3 0 19 4.4 26.5 12 7.4 7.5 11.7 17.1 11.7 26.2V190c0 7.7 6.3 14 14 14s14-6.3 14-14v-59.8c0-36.5-29.7-66.2-66.2-66.2zM174 420h-59.8c-9.3 0-19-4.4-26.5-12-7.4-7.5-11.7-17.1-11.7-26.2V322c0-7.7-6.3-14-14-14s-14 6.3-14 14v59.8c0 36.5 29.7 66.2 66.2 66.2H174c7.7 0 14-6.3 14-14s-6.3-14-14-14zM450 308c-7.7 0-14 6.3-14 14v59.8c0 9.1-4.3 18.7-11.7 26.2-7.5 7.6-17.2 12-26.5 12H338c-7.7 0-14 6.3-14 14s6.3 14 14 14h58.8c37 0 67.2-30.1 67.2-67.2V322c0-7.7-6.3-14-14-14z"></path></svg>`;
};

export const contractIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="M64 371.2h76.795V448H192V320H64v51.2zm76.795-230.4H64V192h128V64h-51.205v76.8zM320 448h51.2v-76.8H448V320H320v128zm51.2-307.2V64H320v128h128v-51.2h-76.8z"></path></svg>`;
};

export const tvOutLineIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path d="M216,66H142.48l37.76-37.76a6,6,0,0,0-8.48-8.48L128,63.51,84.24,19.76a6,6,0,1,0-8.48,8.48L113.52,66H40A14,14,0,0,0,26,80V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V80A14,14,0,0,0,216,66Zm2,134a2,2,0,0,1-2,2H40a2,2,0,0,1-2-2V80a2,2,0,0,1,2-2H216a2,2,0,0,1,2,2Z"></path></svg>`;
};

export const magnetIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-miterlimit="10" stroke-width="32" d="M421.83 293.82A144 144 0 00218.18 90.17m135.76 135.77a48 48 0 00-67.88-67.88"></path><path stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M192 464v-48m-101.82 5.82l33.94-33.94M48 320h48"></path><path fill="none" stroke-linejoin="round" stroke-width="32" d="M286.06 158.06L172.92 271.19a32 32 0 01-45.25 0L105 248.57a32 32 0 010-45.26L218.18 90.17m203.65 203.65L308.69 407a32 32 0 01-45.26 0l-22.62-22.63a32 32 0 010-45.26l113.13-113.17M139.6 169.98l67.88 67.89m67.88 67.88l67.89 67.88"></path></svg>`;
};

export const albumIcon = (width = 16, height = 16) => {
  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg"><rect width="384" height="256" x="64" y="176" fill="none" stroke-linejoin="round" stroke-width="32" rx="28.87" ry="28.87"></rect><path stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M144 80h224m-256 48h288"></path></svg>`;
};
