/** @type {import('next').NextConfig} */
const nextConfig = {
    images :{
        remotePatterns:[
            {
                protocol:"https" ,
                hostname : "seeklogo.com"
            }, 
            {
                protocol:"https" ,
                hostname : "st.redbus.in"
            }
        ]
    }
};

export default nextConfig;
