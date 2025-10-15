'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 overflow-hidden relative">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute bg-[#47b7fc] top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
          <motion.div
            className="absolute bg-[#0b69ff26] bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 p-8 md:p-16 w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <motion.div
            className="absolute bg-[#1e88ff] inset-0 rounded-full blur-xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="relative border-2 border-[#3ca1e8] bg-[#ffffff] transparent z-10 w-24 h-24 rounded-full overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain p-3 select-none"
              priority
              draggable={false}
            />
          </motion.div>

          <motion.div
            className="absolute border-[#0b69ff] inset-0 w-24 h-24 rounded-full border-2 opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-6xl text-foreground md:text-8xl font-black mb-4 tracking-wider relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="relative z-10">404</span>
            <motion.div
              className="absolute text-destructive inset-0 text-6xl md:text-8xl font-black blur-sm opacity-20"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.div>
          </motion.h1>
          <motion.h2
            className="text-2xl text-foreground md:text-3xl font-bold tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Страница не найдена
          </motion.h2>
        </motion.div>

        <motion.div
          className="text-center max-w-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="text-lg text-[#02237d] md:text-xl leading-relaxed mb-2">
            Похоже, вы заблудились в цифровом пространстве.
          </p>
          <motion.p
            className="text-base text-[#1945bd]"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Давайте вернем вас назад!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="group bg-button hover:bg-button-hover relative px-8 py-4 rounded-full font-bold text-lg shadow-2xl overflow-hidden cursor-pointer"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => {
              router.back();
            }}
          >
            <motion.div
              className="absolute bg-button inset-0 blur opacity-0"
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative text-foreground flex items-center gap-3">
              <motion.div
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft size={20} />
              </motion.div>{' '}
              <span>Назад</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[
            { left: '15%', top: '20%', delay: 0 },
            { left: '25%', top: '60%', delay: 0.5 },
            { left: '45%', top: '30%', delay: 1 },
            { left: '65%', top: '70%', delay: 1.5 },
            { left: '80%', top: '25%', delay: 2 },
            { left: '10%', top: '80%', delay: 0.3 },
            { left: '75%', top: '45%', delay: 0.8 },
            { left: '35%', top: '85%', delay: 1.3 },
            { left: '55%', top: '15%', delay: 1.8 },
            { left: '90%', top: '55%', delay: 0.2 },
            { left: '20%', top: '90%', delay: 0.7 },
            { left: '70%', top: '10%', delay: 1.2 },
            { left: '40%', top: '50%', delay: 1.7 },
            { left: '85%', top: '75%', delay: 0.4 },
            { left: '5%', top: '40%', delay: 0.9 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#0b69ff] w-1 h-1 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
