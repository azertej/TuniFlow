import Image from "next/image";
import Link from "next/link";
import React from "react";

interface metricProps {
  icon: string;
  alt: string;
  value: string | number;
  title: string;
  extraClass: string;
  href?: string;
  auther?: boolean;
}

const Metric = ({
  icon,
  alt,
  value,
  title,
  extraClass,
  href,
  auther,
}: metricProps) => {
  return (
    <div>
      {href ? (
        <div className="flex gap-x-2 items-center">
          <Link href={href}>
            <Image
              src={icon}
              alt={alt}
              width={20}
              height={20}
              className={`object-contain ${auther ? "rounded-full font-semi-bold cursor-pointer" : ""}`}
            />
          </Link>
          <p className={` flex gap-x-1 items-center ${extraClass}`}>
            <Link href={href} className='font-inter '>{value}</Link>
            <span className="line-clamp-1 small-regular">{title}</span>
          </p>
        </div>
      ) : (
        <div className="flex gap-x-1 items-center">
          <Image
            src={icon}
            alt={alt}
            width={15}
            height={15}
            className={`object-contain ${auther ? "rounded-full font-semi-bold cursor-pointer" : ""}`}
          />
          <p className={` flex items-center ${extraClass}`}>
            {value} {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default Metric;
