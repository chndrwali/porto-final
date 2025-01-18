const config = {
  env: {
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    resendApiKey: process.env.RESEND_API_KEY!,
  },
};

export default config;
