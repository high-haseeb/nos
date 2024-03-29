"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:bg-[#00000040] dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 backdrop-filter backdrop-blur-lg"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-lg mx-auto z-50 hidden sm:block",
        className,
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Cas clients">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Success Stories"
              href="https://algochurn.com"
              src="/images/articles/article_4.jpg"
              description="Explore how our solutions drive client success"
            />
            <ProductItem
              title="Customer Spotlights"
              href="https://tailwindmasterkit.com"
              src="/images/articles/article_3.jpg"
              description="Dive into stories of tangible outcomes and achievements"
            />
            <ProductItem
              title="Client Chronicles"
              href="https://gomoonbeam.com"
              src="/images/articles/article_3.jpg"
              description="Follow along as clients share their journey to success"
            />
            <ProductItem
              title="Testimonial Tales"
              href="https://userogue.com"
              src="/images/articles/article_4.jpg"
              description="Hear directly from satisfied customers about their experiences"
            />
          </div>
        </MenuItem>
        <Link href={'/agence'}><MenuItem setActive={setActive} active={active} item="Agence"/></Link>
        <MenuItem setActive={setActive} active={active} item="Actualités">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Brand Revolution"
              href="https://algochurn.com"
              src="/images/articles/article_4.jpg"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Digital Dominance"
              href="https://tailwindmasterkit.com"
              src="/images/articles/article_3.jpg"
              description="Maximize your online presence with digital marketing."
            />
            <ProductItem
              title="Compelling Content"
              href="https://gomoonbeam.com"
              src="/images/articles/article_3.jpg"
              description="Craft captivating content that resonates."
            />
            <ProductItem
              title="Social Success"
              href="https://userogue.com"
              src="/images/articles/article_4.jpg"
              description="Foster engagement and amplify your message"
            />
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Expertise">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Strategic Solutions</HoveredLink>
            <HoveredLink href="/individual">Industry Insights</HoveredLink>
            <HoveredLink href="/team">Creative Campaigns</HoveredLink>
            <HoveredLink href="/enterprise">Consultation Request</HoveredLink>
          </div>
        </MenuItem>
        <Link href="/contact">
        <MenuItem
          setActive={setActive}
          active={active}
          item="Contact"
        ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
