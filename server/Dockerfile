FROM node:18

WORKDIR /server

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
RUN apt-get update && apt-get install -y gnupg wget && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install -y google-chrome-stable --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
  wget \
  gnupg2 \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libcups2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxrandr2 \
  libxss1 \
  libxtst6 \
  libnss3 \
  libxss1 \
  libxshmfence1 \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Set the path to the Chrome executable
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install

COPY . .
RUN npx prisma generate

EXPOSE 3333
CMD ["npm", "run", "dev"]
