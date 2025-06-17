"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Star,
  Filter,
  Code2,
  Brain,
  Database,
  Globe,
  Play,
  ArrowUpRight,
  Sparkles,
  Eye,
  Heart,
  Zap,
} from "lucide-react";

import { Icon } from "@iconify/react";

const techIcons: { [key: string]: JSX.Element } = {
  Python: <Icon icon="logos:python" />,
  Django: <Icon icon="logos:django" />,
  NumPy: <Icon icon="logos:numpy" />,
  Matplotlib: <Icon icon="logos:matplotlib-icon" />,
  "Scikit-learn": (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <path
        fill="#f89939"
        d="M98.18 88.13c15.63-15.62 18.23-38.36 5.8-50.78s-35.17-9.82-50.8 5.8s-11.11 45.48-5.8 50.78c4.29 4.29 35.17 9.82 50.8-5.8"
      />
      <path
        fill="#3499cd"
        d="M34.04 65.56c-9.07-9.06-22.27-10.57-29.48-3.37c-7.21 7.21-5.7 20.4 3.37 29.46c9.07 9.07 26.4 6.44 29.48 3.37c2.49-2.49 5.71-20.4-3.37-29.46"
      />
      <path
        fill="#010101"
        d="M123.82 85.68c-.58 0-.87-.35-.87-1.06c0-.53.35-1.69 1.04-3.46c1.01-2.59 1.52-4.45 1.52-5.58c0-.68-.2-1.25-.6-1.7s-.9-.68-1.5-.68c-.88 0-1.89.41-3.03 1.24s-2.67 2.32-4.6 4.48c.28-1.4.88-3.32 1.78-5.76l-4.31.83q-1.47 3.18-2.13 5.73c-.22.83-.38 1.69-.49 2.56c-1.35 1.31-2.23 2.1-2.61 2.39c-.39.29-.8.43-1.22.43c-.39 0-.7-.15-.93-.44s-.34-.69-.34-1.18q0-.795.3-1.83c.3-1.035.64-1.99 1.33-3.9l1.64-4.52l-1.61.07c-1.46 2.78-3.17 4.28-5.13 4.49c.53-1.38.8-2.44.8-3.18q0-1.41-1.38-1.41c-1.09 0-1.94.51-2.55 1.54Q98 76.285 98 77.65c0 1.365.51 1.55 1.52 2c-.66.97-1.4 1.88-2.2 2.74c-.95.94-1.69 1.66-2.23 2.13c-.55.49-1.06.73-1.52.73c-.72 0-1.08-.51-1.08-1.52s.4-2.75 1.2-5.35l1.56-5.18h-.99l-3.61 2c-.59-1.35-1.62-2.03-3.09-2.03c-1.17 0-2.51.5-4.03 1.49s-2.77 2.28-3.74 3.89c-.75 1.24-1.21 2.54-1.38 3.88c-1.36 1.36-2.38 2.24-3.06 2.65c-.71.42-1.45.63-2.23.63q-2.985 0-3.69-3.45c5.19-1.52 7.78-3.5 7.78-5.94c0-.92-.33-1.66-.99-2.23s-1.54-.85-2.63-.85q-3.165 0-5.76 3.03c-1.57 1.83-2.42 3.86-2.57 6.09c-1.43 1.41-2.51 2.34-3.21 2.79c-.72.46-1.4.69-2.03.69s-1.13-.3-1.5-.9c-.38-.6-.57-1.41-.57-2.44c0-.46.05-1.3.14-2.53c2.36-2.56 4.09-4.96 5.2-7.21s1.66-4.58 1.66-6.98c0-.85-.11-1.52-.33-2.02q-.33-.75-.84-.75c-.07 0-.18.02-.32.07l-4.49 1.66c-1.53 2.92-2.84 6.11-3.91 9.58c-1.07 3.46-1.61 6.43-1.61 8.9c0 1.65.38 2.96 1.16 3.94c.77.98 1.79 1.47 3.05 1.47c1.1 0 2.25-.35 3.46-1.05s2.61-1.79 4.22-3.26s0-.02 0-.02c.19 1.11.65 2.04 1.37 2.8c.99 1.02 2.28 1.54 3.88 1.54c1.44 0 2.75-.35 3.94-1.05c1.15-.67 2.44-1.72 3.88-3.11c.12 1.04.46 1.94 1.03 2.71c.73.97 1.61 1.46 2.64 1.46s2.09-.4 3.09-1.2s2.08-2.05 3.26-3.73c-.11 3.29.77 4.93 2.63 4.93c.74 0 1.52-.27 2.33-.81s2.16-1.71 4.05-3.5c1.64-1.62 2.84-3.14 3.61-4.56c1.04-.18 1.99-.49 2.86-.94c-1.78 2.79-2.67 5.02-2.67 6.68c0 .9.25 1.65.74 2.25s1.1.91 1.82.91c1.57 0 3.8-1.41 6.68-4.2c0 .22-.02.43-.02.65c0 .78.07 1.96.19 3.55l3.91-.92c0-1.06.02-1.9.05-2.53c.06-.84.18-1.76.35-2.76q.165-.885.81-1.68l.99-1.15c.36-.42.71-.8 1.02-1.13q.555-.585.99-.99c.33-.29.62-.53.87-.69c.27-.16.49-.25.65-.25c.29 0 .44.19.44.57s-.28 1.26-.83 2.65c-1.04 2.59-1.56 4.52-1.56 5.78c0 .93.24 1.67.73 2.23c.48.55 1.12.83 1.91.83c1.94 0 4.28-1.44 7-4.31V82.3c-1.93 2.27-3.32 3.41-4.18 3.41Zm-65.26-8.29c.8-3.91 1.62-6.94 2.45-9.11s1.47-3.26 1.9-3.26c.2 0 .37.13.5.4c.13.26.19.62.19 1.05c0 1.49-.46 3.26-1.4 5.33c-.93 2.06-2.15 3.93-3.64 5.59m11.79-.98c.71-1.19 1.45-1.78 2.23-1.78c.82 0 1.24.57 1.24 1.7c0 2.29-1.51 3.85-4.53 4.7c0-1.9.35-3.44 1.06-4.62m17.48 5.85c-1.04 2.01-2.16 3.01-3.33 3.01c-.48 0-.88-.2-1.19-.59s-.47-.91-.47-1.55c0-1.68.53-3.53 1.58-5.53s2.17-3 3.35-3c.49 0 .89.18 1.18.56c.29.37.44.89.44 1.55c0 1.7-.52 3.55-1.56 5.56Z"
      />
      <path
        fill="#fff"
        d="M75.46 64.88c.15.21.22.48.22.8s-.09.61-.27.88s-.44.49-.79.64c-.34.15-.73.23-1.16.23c-.72 0-1.26-.15-1.64-.45s-.62-.74-.72-1.33l.93-.15c.05.37.2.66.43.85c.24.2.57.3 1 .3s.75-.09.96-.26s.31-.38.31-.62c0-.21-.09-.38-.28-.5c-.13-.08-.45-.19-.96-.32c-.69-.17-1.16-.32-1.43-.45s-.47-.3-.6-.53s-.21-.47-.21-.74c0-.25.06-.47.17-.68s.27-.38.46-.52c.15-.11.34-.2.59-.27s.52-.11.81-.11c.43 0 .81.06 1.14.19c.33.12.57.29.73.51c.16.21.26.5.32.86l-.92.12c-.04-.28-.16-.51-.36-.67s-.48-.24-.85-.24c-.43 0-.74.07-.92.21s-.28.31-.28.5c0 .12.04.23.11.33c.08.1.2.18.36.25c.09.03.37.11.83.24c.66.18 1.12.32 1.39.43c.26.11.47.28.62.49Zm4.47 1.44c-.25.23-.55.34-.92.34c-.46 0-.83-.17-1.11-.5s-.43-.88-.43-1.62s.15-1.27.44-1.6s.68-.51 1.15-.51c.31 0 .58.09.8.28s.37.47.46.84l.91-.14c-.11-.56-.35-.99-.73-1.29q-.57-.45-1.47-.45c-.48 0-.91.11-1.32.34c-.4.22-.71.56-.9 1.01c-.2.45-.3.97-.3 1.57c0 .92.23 1.63.69 2.12s1.07.74 1.82.74q.9 0 1.53-.54c.41-.36.67-.86.77-1.49l-.92-.12c-.07.47-.22.81-.47 1.04Zm2.19.98h.94v-5.52h-.94zm0-6.55h.94v-1.08h-.94zm6.73 1.02h-1.21l-2.22 2.25v-4.35h-.94v7.62h.94V65.1l.66-.63l1.83 2.82h1.16l-2.33-3.47zm.96-1.02h.94v-1.08h-.94zm0 6.55h.94v-5.52h-.94zm4.41-.84c-.17.02-.31.04-.41.04c-.14 0-.25-.02-.32-.07s-.13-.11-.16-.18c-.03-.08-.05-.25-.05-.51v-3.23h.94v-.73h-.94v-1.93l-.93.56v1.37h-.69v.73h.69v3.18c0 .56.04.93.11 1.1q.12.27.39.42c.19.11.45.16.79.16c.21 0 .44-.03.71-.08l-.14-.83Z"
      />
    </svg>
  ),
  Jupyter: <Icon icon="logos:jupyter" />,
  Pandas: (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <path
        fill="#130754"
        d="M11.354 115.114c-2.44 0-4.919-1.008-6.475-2.985v10.677H0V96.451h4.413l.174 2.89c1.514-2.229 4.204-3.406 6.768-3.403c4.917 0 8.544 4.12 8.544 9.587s-3.629 9.593-8.546 9.59zM9.843 99.56c-2.849 0-5.174 2.228-5.174 5.97s2.311 5.97 5.171 5.97s5.166-2.228 5.166-5.97s-2.307-5.97-5.164-5.97zm28.442 15.054l-.169-2.9c-1.512 2.228-4.204 3.405-6.766 3.405c-4.92 0-8.542-4.121-8.542-9.587c0-5.464 3.615-9.586 8.542-9.583c2.561 0 5.254 1.186 6.766 3.404l.17-2.899H42.7v18.162zm-5.421-15.053c-2.848 0-5.171 2.228-5.171 5.97s2.31 5.97 5.17 5.97s5.17-2.228 5.17-5.967c0-3.74-2.31-5.958-5.17-5.972zm26.898 15.057V104.56c0-3.531-1.22-4.709-3.447-4.709c-2.311 0-4.834 2.1-4.837 4.623v10.132h-4.874V96.454h4.469l.208 3.365c1.22-2.313 3.953-3.868 6.727-3.868c4.833 0 6.644 3.365 6.644 7.864v10.803zm22.756.002l-.17-2.901c-1.511 2.228-4.201 3.404-6.767 3.404c-4.918 0-8.542-4.12-8.542-9.585s3.616-9.584 8.542-9.584c2.437 0 4.919 1.01 6.474 2.986v-9.543h4.876v25.224Zm-5.42-15.043c-2.86 0-5.173 2.228-5.173 5.97s2.31 5.967 5.17 5.97c2.86 0 5.17-2.228 5.17-5.97s-2.31-5.97-5.167-5.97m28.157 15.046l-.167-2.9c-1.514 2.228-4.206 3.406-6.768 3.403c-4.919 0-8.542-4.12-8.542-9.584c0-5.465 3.616-9.586 8.542-9.584c2.562 0 5.254 1.187 6.768 3.405l.169-2.9h4.425v18.16Zm-5.421-15.046c-2.859 0-5.17 2.228-5.17 5.97s2.311 5.97 5.17 5.97s5.17-2.228 5.17-5.97s-2.31-5.97-5.17-5.97m20.642 15.637a14.27 14.27 0 0 1-7.274-2.06l.798-3.374c1.472.883 3.7 2.02 6.39 2.02c1.933 0 3.28-.589 3.28-2.104c0-1.301-1.387-1.765-3.869-2.353c-4.453-.968-6.052-3.321-6.05-5.886c0-2.848 2.228-5.548 7.147-5.548c2.985 0 5.59 1.305 6.169 1.64l-.79 3.215a10.56 10.56 0 0 0-5.254-1.515c-1.976 0-2.944.672-2.944 1.765c0 1.218 1.262 1.766 3.196 2.228c4.79 1.01 6.725 3.237 6.725 5.677c0 3.9-2.86 6.294-7.524 6.294zM52.438 9.875h8.661v17.988h-8.661zm0 36.948h8.661V64.81h-8.661z"
      />
      <path fill="#ffca00" d="M52.438 33.116H61.1v8.486h-8.662z" />
      <path
        fill="#130754"
        d="M38.522 24.665h8.662v59.79h-8.662Zm27.544 36.998h8.663V79.65h-8.663zm0-36.976h8.663v17.987h-8.663z"
      />
      <path fill="#e70488" d="M66.066 47.924h8.663v8.485h-8.663z" />
      <path fill="#130754" d="M79.69 5.194h8.663v59.788H79.69z" />
    </svg>
  ),
  TensorFlow: <Icon icon="logos:tensorflow" />,
  TailwindCSS: <Icon icon="logos:tailwindcss-icon" />,
  PostgreSQL: <Icon icon="logos:postgresql" />,
  Vercel: (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <path d="M64.002 8.576L128 119.424H0Zm0 0" />
    </svg>
  ),
  HTML5: <Icon icon="logos:html-5" />,
  JavaScript: <Icon icon="logos:javascript" />,
  Bootstrap: <Icon icon="logos:bootstrap" />,
  SQLite: <Icon icon="logos:sqlite" />,
  CSS3: <Icon icon="logos:css-3" />,
  "PayPal API": <Icon icon="logos:paypal" />,
  FastAPI: <Icon icon="logos:fastapi-icon" />,
  "Node.js": <Icon icon="logos:nodejs-icon" />,
  "Express.js": <Icon icon="logos:express" />,
  MongoDB: <Icon icon="logos:mongodb" />,
  React: <Icon icon="logos:react" />,
  Streamlit: <Icon icon="logos:streamlit" />,
  Cryptography: <Icon icon="mdi:security" />,
  Base64: <Icon icon="tabler:binary-tree" />,
  Hashlib: <Icon icon="heroicons-solid:finger-print" />,
  Tkinter: <Icon icon="mdi:language-python" />,
  CLI: <Icon icon="mdi:console" />,
  "CRUD Operations": <Icon icon="mdi:database-sync" />,
  "Data Management": <Icon icon="mdi:database-cog" />,
  Seaborn: (
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
    >
      <path
        fill="#fff"
        d="M128.902 2.393a124.7 124.7 0 0 0-124.7 124.7a124.7 124.7 0 0 0 124.7 124.698A124.7 124.7 0 0 0 253.59 128.676l.01-1.584l-.01-1.584A124.7 124.7 0 0 0 128.902 2.393"
      />
      <g fill="#afdad2" stroke="#fff" stroke-width="0.25">
        <path d="M100.427 73.98a4.803 4.803 0 1 0 0-9.606a4.803 4.803 0 0 0 0 9.606Zm-10.343 7.242a4.652 4.652 0 1 0 0-9.304a4.652 4.652 0 0 0 0 9.304Zm-9.949 4.608a4.38 4.38 0 1 0 0-8.76a4.38 4.38 0 0 0 0 8.76Zm29.017-17.572a4.946 4.946 0 1 0 0-9.89a4.946 4.946 0 0 0 0 9.89ZM72.67 75.444a3.323 3.323 0 1 0 0-6.646a3.323 3.323 0 0 0 0 6.646Zm-8.205 18.204a3.948 3.948 0 1 0 0-7.896a3.948 3.948 0 0 0 0 7.896Zm5.022-31.26a4.757 4.757 0 1 0 0-9.515a4.757 4.757 0 0 0 0 9.515Zm12.837 8.902a3.68 3.68 0 1 0 0-7.358a3.68 3.68 0 0 0 0 7.359Zm63.444-10.98a4.302 4.302 0 1 0 0-8.605a4.302 4.302 0 0 0 0 8.605ZM55.535 83.116a2.608 2.608 0 1 0 0-5.216a2.608 2.608 0 0 0 0 5.216ZM64.2 80.66a3.095 3.095 0 1 0 0-6.189a3.095 3.095 0 0 0 0 6.19Zm-15.801-9.806a4.103 4.103 0 1 0 0-8.205a4.103 4.103 0 0 0 0 8.205Zm16.141-1.808a2.139 2.139 0 1 0 0-4.277a2.139 2.139 0 0 0 0 4.277Zm28.635-3.334a3.992 3.992 0 1 0 0-7.985a3.992 3.992 0 0 0 0 7.985Zm30.33 2.311a3.446 3.446 0 1 0 0-6.891a3.446 3.446 0 0 0 0 6.89Zm6.307-21.497a2.255 2.255 0 1 0 0-4.51a2.255 2.255 0 0 0 0 4.51Zm7.331 12.982a3.768 3.768 0 1 0 0-7.536a3.768 3.768 0 0 0 0 7.536ZM99.5 57.31a3.872 3.872 0 1 0 0-7.744a3.872 3.872 0 0 0 0 7.744ZM50.998 94.521a3.142 3.142 0 1 0 0-6.284a3.142 3.142 0 0 0 0 6.284Z" />
        <path d="M154.48 61.132a4.785 4.785 0 1 0 0-9.57a4.785 4.785 0 0 0 0 9.57Zm-46.171-3.241a4.392 4.392 0 1 0 0-8.784a4.392 4.392 0 0 0 0 8.784Zm-51.029 3.54a4.072 4.072 0 1 0 0-8.144a4.072 4.072 0 0 0 0 8.144Zm22.662-10.513a4.708 4.708 0 1 0 0-9.416a4.708 4.708 0 0 0 0 9.416Zm88.325 6.34a2.908 2.908 0 1 0 0-5.816a2.908 2.908 0 0 0 0 5.816ZM66.977 45.382a3.7 3.7 0 1 0 0-7.398a3.7 3.7 0 0 0 0 7.398ZM83.658 61.95a3.148 3.148 0 1 0 0-6.296a3.148 3.148 0 0 0 0 6.296Zm7.542-6.832a3.199 3.199 0 1 0-.001-6.397a3.199 3.199 0 0 0 0 6.397Zm-49.398 8.125a3.22 3.22 0 1 0 0-6.44a3.22 3.22 0 0 0 0 6.44Zm8.868-12.521a2.954 2.954 0 1 0 0-5.908a2.954 2.954 0 0 0 0 5.908Zm68.154 9.171a2.476 2.476 0 1 0 0-4.953a2.476 2.476 0 0 0 0 4.953ZM39.53 79.544a4.092 4.092 0 1 0 0-8.185a4.092 4.092 0 0 0 0 8.185Zm-9.14-6.9a3.077 3.077 0 1 0 0-6.153a3.077 3.077 0 0 0 0 6.153Zm96.879-13.47a3.095 3.095 0 1 0 0-6.19a3.095 3.095 0 0 0 0 6.19ZM56.914 75.243a4.77 4.77 0 1 0 0-9.542a4.77 4.77 0 0 0 0 9.542Z" />
        <path d="M162.01 53.552a4.783 4.783 0 1 0 0-9.565a4.783 4.783 0 0 0 0 9.565ZM42.067 98.617a2.776 2.776 0 1 0 0-5.552a2.776 2.776 0 0 0 0 5.552Zm69.34-54.147a3.817 3.817 0 1 0 0-7.633a3.817 3.817 0 0 0 0 7.633Zm79.294 5.256a3.899 3.899 0 1 0 0-7.798a3.899 3.899 0 0 0 0 7.798Zm-51.863-1.986a3.104 3.104 0 1 0 0-6.21a3.104 3.104 0 0 0 0 6.21Zm-67.68 40.953a4.047 4.047 0 1 0 0-8.095a4.047 4.047 0 0 0 0 8.095Zm78.208-39.617a3.875 3.875 0 1 0 0-7.75a3.875 3.875 0 0 0 0 7.75Zm27.438 3.777a3.211 3.211 0 1 0 0-6.423a3.211 3.211 0 0 0 0 6.423Zm30.314 6.96a2.895 2.895 0 1 0 0-5.79a2.895 2.895 0 0 0 0 5.79ZM98.802 38.544a2.495 2.495 0 1 0 0-4.99a2.495 2.495 0 0 0 0 4.99Zm22.683-6.848a3.652 3.652 0 1 0 0-7.305a3.652 3.652 0 0 0 0 7.305Zm84.987 19.578a4.812 4.812 0 1 0 0-9.624a4.812 4.812 0 0 0 0 9.624Zm-90.498 1.966a4.547 4.547 0 1 0 0-9.095a4.547 4.547 0 0 0 0 9.094Zm16.823-17.041a4.536 4.536 0 1 0 0-9.072a4.536 4.536 0 0 0 0 9.072Zm39.323 5.526a4.7 4.7 0 1 0 0-9.399a4.7 4.7 0 0 0 0 9.399Zm48.649 29.541a4.45 4.45 0 1 0 0-8.898a4.45 4.45 0 0 0 0 8.898ZM120.458 17.405a2.54 2.54 0 1 0 0-5.08a2.54 2.54 0 0 0 0 5.08Z" />
        <path d="M161.022 44.369a4.266 4.266 0 1 0 0-8.531a4.266 4.266 0 0 0 0 8.531Zm-5.707-8.193a3.443 3.443 0 1 0 0-6.886a3.443 3.443 0 0 0 0 6.886Zm-17.302-7.496a4.418 4.418 0 1 0 0-8.836a4.418 4.418 0 0 0 0 8.836ZM89.282 46.695a4.952 4.952 0 1 0 0-9.905a4.952 4.952 0 0 0 0 9.905Zm-30.553-7.292a2.697 2.697 0 1 0 0-5.394a2.697 2.697 0 0 0 0 5.394Zm12.821-1.809a3.496 3.496 0 1 0 0-6.992a3.496 3.496 0 0 0 0 6.992Zm117.466 21.181a4.31 4.31 0 1 0 0-8.619a4.31 4.31 0 0 0 0 8.619ZM141.738 36.06a2.393 2.393 0 1 0 0-4.786a2.393 2.393 0 0 0 0 4.786Zm-50.814.482a4.539 4.539 0 1 0 0-9.078a4.539 4.539 0 0 0 0 9.078ZM24.326 92.178a3.946 3.946 0 1 0 0-7.892a3.946 3.946 0 0 0 0 7.892Zm10.512 1.362a4.585 4.585 0 1 0 0-9.17a4.585 4.585 0 0 0 0 9.17Zm37.049-40.42a4.412 4.412 0 1 0 0-8.824a4.412 4.412 0 0 0 0 8.825ZM25.623 82.356a3.42 3.42 0 1 0 0-6.84a3.42 3.42 0 0 0 0 6.84Zm137.891-49.643a3.742 3.742 0 1 0 0-7.485a3.742 3.742 0 0 0 0 7.485ZM59.334 48.427a3.405 3.405 0 1 0 0-6.811a3.405 3.405 0 0 0 0 6.81Z" />
        <path d="M42.825 89.445a4.776 4.776 0 1 0 0-9.553a4.776 4.776 0 0 0 0 9.553Zm155.259-32.502a4.68 4.68 0 1 0 0-9.359a4.68 4.68 0 0 0 0 9.36Zm16.871-.557a3.219 3.219 0 1 0 0-6.437a3.219 3.219 0 0 0 0 6.437ZM103.689 48.42a3.585 3.585 0 1 0 0-7.17a3.585 3.585 0 0 0 0 7.17Zm78.693-4.03a3.003 3.003 0 1 0 0-6.005a3.003 3.003 0 0 0 0 6.005Zm-1.29-7.523a4.897 4.897 0 1 0 0-9.794a4.897 4.897 0 0 0 0 9.794Zm-60.374 8.346a4.378 4.378 0 1 0 0-8.757a4.378 4.378 0 0 0 0 8.757Zm92.517 21.163a3.756 3.756 0 1 0 0-7.512a3.756 3.756 0 0 0 0 7.512ZM33.938 100.288a2.203 2.203 0 1 0 0-4.406a2.203 2.203 0 0 0 0 4.406Zm46.295-61.082a4.113 4.113 0 1 0 0-8.226a4.113 4.113 0 0 0 0 8.226Zm30.02-6.706a2.938 2.938 0 1 0 0-5.876a2.938 2.938 0 0 0 0 5.876Zm85.254 9.046a3.696 3.696 0 1 0 0-7.393a3.696 3.696 0 0 0 0 7.393Zm-93.464-14.978a4.596 4.596 0 1 0 0-9.193a4.596 4.596 0 0 0 0 9.193Z" />
        <path d="M174.151 30.958a4.25 4.25 0 1 0 0-8.501a4.25 4.25 0 0 0 0 8.5Zm-92.824-4.532a3.405 3.405 0 1 0 0-6.81a3.405 3.405 0 0 0 0 6.81Zm8.176-2.632a3.756 3.756 0 1 0 0-7.513a3.756 3.756 0 0 0 0 7.513Zm57.896-4.708a4.407 4.407 0 1 0 0-8.814a4.407 4.407 0 0 0 0 8.814Zm-17.707.934a3.43 3.43 0 1 0 0-6.86a3.43 3.43 0 0 0 0 6.86Zm26.508 4.186a2.623 2.623 0 1 0 0-5.246a2.623 2.623 0 0 0 0 5.246Z" />
        <path d="M147.442 28.232a4.864 4.864 0 1 0 0-9.727a4.864 4.864 0 0 0 0 9.727Zm19.303-4.719a3.361 3.361 0 1 0 0-6.723a3.361 3.361 0 0 0 0 6.723ZM15.926 105.501a4.222 4.222 0 1 0 0-8.444a4.222 4.222 0 0 0 0 8.444Zm95.796-82.278a2.273 2.273 0 1 0 0-4.546a2.273 2.273 0 0 0 0 4.546ZM189.81 33.63a2.743 2.743 0 1 0 0-5.487a2.743 2.743 0 0 0 0 5.486Zm-51.268-13.723a3.967 3.967 0 1 0 0-7.934a3.967 3.967 0 0 0 0 7.934ZM47.95 80.147a4.57 4.57 0 1 0 0-9.142a4.57 4.57 0 0 0 0 9.142Z" />
      </g>
      <path
        fill="#fff"
        d="m174.343 58.56l-4.717-.112l-4.718.108l-4.717.328l-4.715.543l-4.71.753l-4.706.951l-4.698 1.14l-4.691 1.314l-4.684 1.474l-4.676 1.616l-4.667 1.741l-4.66 1.848l-4.653 1.936l-4.645 2.005l-4.639 2.056l-4.632 2.087l-9.246 4.2l-4.614 2.081l-4.61 2.048l-4.605 2.002l-4.6 1.945l-4.596 1.878l-4.593 1.801l-4.59 1.72l-4.587 1.63l-4.585 1.538l-4.583 1.444l-4.581 1.348l-4.582 1.252l-4.58 1.158l-4.581 1.064l-4.582.974l-4.582.886l-4.584.804l-5.028.795l-.222 1.53a122.4 122.4 0 0 0-.496 31.246l.32 2.843l6.64-2.947l4.63-2.088l9.246-4.2l4.614-2.08l4.608-2.042l4.602-1.986l4.594-1.912l4.588-1.82l4.58-1.708l4.572-1.58l4.564-1.437l4.557-1.277l4.549-1.103l4.541-.92l4.535-.723l4.53-.522l4.525-.315l4.523-.104l4.522.109l4.522.318l4.526.526l4.53.727l4.534.921l4.542 1.105l4.549 1.277l4.556 1.436l4.564 1.579l4.573 1.707l4.58 1.817l4.587 1.91l4.595 1.983l4.601 2.04l4.608 2.076l9.235 4.195l4.625 2.086l4.63 2.057l4.636 2.016l4.64 1.962l4.643 1.897l4.647 1.823l4.65 1.742l4.654 1.655l4.655 1.563l4.657 1.468l4.658 1.371l4.66 1.274l4.658 1.178l4.66 1.083l6.552 1.395l.544-1.87a122.4 122.4 0 0 0 4.866-32.645l.01-1.542l-.01-1.554l-.032-1.664a122.4 122.4 0 0 0-9.274-43.627l-.423-1.01l-.756-1.748l-4.763-2.142l-4.63-2.052l-4.639-2.002l-4.645-1.934l-4.653-1.845l-4.66-1.74l-4.667-1.615l-4.676-1.473l-4.684-1.314l-4.69-1.141l-4.7-.954l-4.704-.755l-4.71-.547zm-4.766 1.985l4.62.108l4.62.323l4.62.535l4.62.74l4.62.936l4.62 1.122l4.62 1.295l4.62 1.455l4.62 1.598l4.62 1.724l4.62 1.833l4.62 1.922l4.62 1.995l4.62 2.047l4.024 1.81a120.3 120.3 0 0 1 9.955 44.845l.032 1.636l.01 1.528l-.01 1.528a120.3 120.3 0 0 1-4.783 32.085l-4.608-.98l-4.62-1.074l-4.62-1.168l-4.62-1.263l-4.62-1.36l-4.62-1.455l-4.62-1.551l-4.62-1.643l-4.62-1.73l-4.62-1.813l-4.62-1.887l-4.62-1.953l-4.62-2.01l-4.62-2.052l-4.62-2.083l-9.24-4.198l-4.62-2.082l-4.62-2.047l-4.62-1.994l-4.62-1.923l-4.62-1.833l-4.62-1.724l-4.62-1.598l-4.62-1.454l-4.62-1.296l-4.62-1.122l-4.62-.936l-4.62-.74l-4.62-.535l-4.62-.323l-4.62-.108l-4.62.108l-4.62.323l-4.62.535l-4.62.74l-4.62.936l-4.62 1.122l-4.62 1.296l-4.62 1.454l-4.62 1.598l-4.62 1.724l-4.62 1.833l-4.62 1.923l-4.62 1.994l-4.62 2.047l-4.62 2.082l-9.24 4.198l-4.62 2.083l-4.025 1.787a120.3 120.3 0 0 1 .488-30.712l3.536-.559l4.62-.81l4.62-.895l4.62-.983l4.62-1.073l4.62-1.168l4.62-1.263l4.62-1.36l4.62-1.456l4.62-1.55l4.62-1.643l4.62-1.73l4.62-1.813l4.62-1.887l4.62-1.954l4.62-2.008l4.62-2.053l4.62-2.083l9.24-4.198l4.62-2.082l4.62-2.047l4.62-1.995l4.62-1.922l4.62-1.833l4.62-1.724l4.62-1.598l4.62-1.455l4.62-1.295l4.62-1.122l4.62-.937l4.621-.74l4.62-.534l4.62-.323z"
      />
      <path
        fill="#7db0bc"
        stroke="#fff"
        d="m169.577 60.045l4.643.108l4.643.325l4.642.537l4.641.743l4.64.94l4.638 1.127l4.636 1.3l4.634 1.46l4.632 1.601l4.636 1.73l4.627 1.836l4.626 1.925l4.625 1.997l4.623 2.048l4.201 1.893a120.8 120.8 0 0 1 10.087 45.827l.017 1.024l.01 1.534l-.01 1.531a120.8 120.8 0 0 1-4.933 32.663l-5.07-1.077l-4.63-1.076l-4.63-1.17l-4.629-1.266l-4.63-1.363l-4.628-1.458l-4.628-1.554l-4.628-1.646l-4.627-1.733l-4.627-1.815l-4.626-1.89l-4.624-1.955l-4.624-2.01l-4.622-2.054l-4.622-2.084l-9.238-4.197l-4.618-2.08l-4.615-2.046l-4.614-1.992l-4.612-1.92l-4.61-1.828l-4.615-1.722l-4.608-1.594l-4.606-1.45l-4.604-1.291l-4.602-1.118l-4.6-.932l-4.6-.737l-4.597-.532l-4.598-.321l-4.596-.108l-4.597.108l-4.597.321l-4.598.532l-4.6.737l-4.6.932l-4.602 1.118l-4.604 1.29l-4.606 1.451l-4.607 1.594l-4.605 1.718l-4.612 1.83l-4.614 1.92l-4.616 1.992l-4.617 2.046l-4.619 2.081l-9.241 4.199l-4.622 2.084l-4.647 2.065a120.8 120.8 0 0 1 .465-31.882l3.892-.617l4.611-.809l4.612-.892l4.61-.98l4.611-1.072l4.61-1.165l4.611-1.26l4.611-1.358l4.612-1.453l4.611-1.547l4.612-1.64l4.613-1.728l4.614-1.81l4.614-1.885l4.615-1.951l4.617-2.007l4.617-2.052l4.619-2.083l9.241-4.198l4.623-2.083l4.625-2.05l4.626-1.996l4.627-1.926l4.63-1.836l4.626-1.727l4.632-1.602l4.634-1.459l4.636-1.3l4.638-1.126l4.64-.94l4.64-.744l4.643-.537l4.643-.325z"
        stroke-width="1"
      />
      <path
        fill="#5c7da2"
        d="m95.657 115.985l4.62.108l4.62.323l4.62.535l4.62.74l4.62.936l4.62 1.122l4.62 1.296l4.62 1.454l4.62 1.598l4.62 1.724l4.62 1.833l4.62 1.923l4.62 1.994l4.62 2.047l4.62 2.082l4.62 2.099l4.62 2.099l4.62 2.083l4.62 2.053l4.62 2.009l4.62 1.953l4.62 1.887l4.62 1.813l4.62 1.73l4.62 1.643l4.62 1.55l4.62 1.457l4.62 1.36l4.62 1.262l4.62 1.168l4.62 1.074l3.955.84a120.28 120.28 0 0 1-68.806 75.342a120.284 120.284 0 0 1-157.154-65.096a120.3 120.3 0 0 1-8.133-30.376l3.757-1.669l4.62-2.083l4.62-2.1l4.62-2.098l4.62-2.082l4.62-2.047l4.62-1.994l4.62-1.923l4.62-1.833l4.62-1.724l4.62-1.598l4.62-1.454l4.62-1.296l4.62-1.122l4.62-.936l4.62-.74l4.62-.535l4.62-.323z"
      />
      <path
        fill="#444876"
        d="M104.897 147.13v15.493h27.72v21.396h27.72v14.634h27.72v6.177h27.72v5.399a120.28 120.28 0 0 1-133.81 28.893a120.28 120.28 0 0 1-60.231-54.77v-14.434h27.72V150.61h27.72v-3.48z"
      />
      <path
        fill="#fff"
        d="M105.843 146.184v15.493h27.72v21.395h27.72v14.635h27.72v6.177h27.72l.002 5.322q-.936 1.02-1.895 2.023l-.001-5.454h-25.826v25.883q-.942.555-1.894 1.092v-33.151l-25.826-.001v43.982q-.945.273-1.894.529v-59.145h-25.826v63.185q-.947.043-1.894.073v-84.653h-25.826v82.65q-.949-.177-1.895-.37l.001-97.774H78.122v1.59h.001v87.785q-.952-.433-1.895-.883l.001-85.01H50.402v17.414h.001l-.001 50.93a120 120 0 0 1-1.893-1.631v-47.406H22.682l-.001 15.236q-.976-1.769-1.893-3.571l.002-13.558h27.72v-19.306h27.72v-3.481z"
      />
      <path
        fill="#444876"
        d="M127.997 0a128 128 0 0 1 127.986 126.37l.01 1.627l-.01 1.626a128 128 0 0 1-127.986 126.37A128 128 0 0 1 0 127.998A128 128 0 0 1 127.997 0m0 4.203A123.797 123.797 0 0 0 4.203 127.997A123.797 123.797 0 0 0 127.997 251.79A123.797 123.797 0 0 0 251.78 129.57l.01-1.573l-.01-1.573A123.797 123.797 0 0 0 127.997 4.203"
      />
    </svg>
  ),
  Plotly: <Icon icon="simple-icons:plotly" />,
  PHP: <Icon icon="logos:php" />,
  HTML: <Icon icon="logos:html-5" />,
  CSS: <Icon icon="logos:css-3" />,
  MySQL: <Icon icon="logos:mysql" />,
  TypeScript: <Icon icon="logos:typescript-icon" />,
  "Tailwind CSS": <Icon icon="logos:tailwindcss-icon" />,
  "Framer Motion": <Icon icon="simple-icons:framer" />,
  Flask: <Icon icon="logos:flask" />,
  NLTK: <Icon icon="simple-icons:nltk" />,
  "HTML/CSS": <Icon icon="logos:html-5" />,
};

const projects = [
  {
    id: 1,
    title: "Climate Agriculture ML Analysis",
    description:
      "Analisis machine learning untuk pertanian berbasis iklim menggunakan Jupyter Notebook. Proyek ini mengimplementasikan algoritma ML untuk memprediksi hasil pertanian berdasarkan data iklim.",
    image:
      "https://images.pexels.com/photos/31737301/pexels-photo-31737301.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: [
      "Python",
      "Jupyter",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
    ],
    github: "https://github.com/zidanmubarak/climate-agriculture-ml-analysis",
    demo: undefined,
    stats: { stars: 3, views: "150+", likes: 12 },
  },
  {
    id: 2,
    title: "NusantaraGo-ML",
    description:
      "Aplikasi web cerdas untuk rekomendasi wisata Indonesia menggunakan Machine Learning. Menggabungkan teknologi ML dengan web development untuk memberikan sistem rekomendasi tempat wisata yang personal dan akurat.",
    image:
      "https://images.pexels.com/photos/27427258/pexels-photo-27427258.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Machine Learning",
    tech: [
      "Python",
      "Flask",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "TensorFlow",
      "HTML/CSS",
      "JavaScript",
    ],
    github: "https://github.com/NusantaraGo/NusantaraGo-ML",
    demo: undefined,
    stats: { stars: 2, views: "100+", likes: 8 },
  },
  {
    id: 3,
    title: "Toko Buku CLI CRUD",
    description:
      "Aplikasi Command Line Interface (CLI) untuk manajemen toko buku dengan operasi CRUD lengkap. Dibangun dengan Python untuk demonstrasi pengelolaan data sederhana.",
    image:
      "https://images.pexels.com/photos/6424587/pexels-photo-6424587.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Python Development",
    tech: ["Python", "SQLite", "CLI", "CRUD Operations", "Data Management"],
    github: "https://github.com/zidanmubarak/toko-buku-cli-crud",
    demo: undefined,
    stats: { stars: 2, views: "80+", likes: 6 },
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description:
      "Dashboard visualisasi data interaktif menggunakan Python. Menampilkan berbagai jenis grafik dan chart untuk analisis data yang komprehensif.",
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Data Science",
    tech: [
      "Python",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Pandas",
      "NumPy",
      "Jupyter",
    ],
    github: "https://github.com/zidanmubarak/data-visualization-dashboard",
    demo: undefined,
    stats: { stars: 2, views: "120+", likes: 10 },
  },
  {
    id: 5,
    title: "Guest Book System",
    description:
      "Sistem buku tamu web-based menggunakan PHP. Aplikasi sederhana untuk mengelola dan menampilkan pesan dari pengunjung website.",
    image:
      "/dashboard.png?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: ["PHP", "HTML", "CSS", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/zidanmubarak/guest-book-system",
    demo: undefined,
    stats: { stars: 2, views: "90+", likes: 7 },
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "Website portfolio pribadi yang menampilkan proyek, keahlian, dan pengalaman. Dibangun dengan teknologi modern untuk showcase karya dan kemampuan.",
    image:
      "/web-portofolio.png?auto=compress&cs=tinysrgb&w=800",
    featured: true,
    category: "Web Development",
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    github: "https://github.com/zidanmubarak/web-portofolio",
    demo: "https://zidanmubarak.vercel.app",
    stats: { stars: 2, views: "200+", likes: 15 },
  },
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="min-h-screen py-20 lg:py-32 relative overflow-hidden bg-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-blue-500/20 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">Featured Work</span>
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </motion.div>

            <motion.h2
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              My{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              A collection of innovative solutions, from cutting-edge AI
              implementations to full-stack applications that solve real-world
              problems.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden h-full transition-all duration-500 hover:bg-white/8 hover:shadow-3xl">
                    {/* Project Image with Overlay */}
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Stats Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white/80 text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span>{project.stats.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-blue-400" />
                            <span>{project.stats.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-400" />
                            <span>{project.stats.likes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-xl"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        {project.demo && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
                            asChild
                          >
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Demo
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </motion.div>
                    </div>

                    <CardContent className="p-8 flex flex-col">
                      {/* Project Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stack - PERBAIKAN DISINI */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-blue-400" />
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-3 items-center">
                          {project.tech && project.tech.length > 0 ? (
                            project.tech.map((tech, techIndex) => {
                              const IconComponent = techIcons[tech];
                              return IconComponent ? (
                                <motion.div
                                  key={`${project.id}-tech-${techIndex}`}
                                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md transition-all duration-300 hover:scale-110"
                                  whileHover={{ scale: 1.1 }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: techIndex * 0.05 }}
                                >
                                  {IconComponent}
                                </motion.div>
                              ) : null;
                            })
                          ) : (
                            <span className="text-slate-500 text-sm italic">
                              No tech stack specified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons (Removed as per previous user changes) */}
                      {/* <div className="flex gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 rounded-xl transition-all duration-300"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          asChild
                        >
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      </div> */}
                    </CardContent>
                  </Card>

                  {/* Floating glow effect */}
                  {hoveredProject === project.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Want to see more of my work?
              </h3>
              <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto">
                Explore my complete portfolio on GitHub and discover more
                innovative projects, open-source contributions, and experimental
                code.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a
                    href="https://github.com/zidanmubarak?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-3 h-6 w-6" />
                    View All Projects
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-blue-500/30 px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <Sparkles className="mr-3 h-6 w-6" />
                  Let's Collaborate
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
