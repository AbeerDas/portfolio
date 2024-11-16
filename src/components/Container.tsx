import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";

type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
  target?: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#about", text: "about" },
  { href: "#projects", text: "projects" },
  { href: "#experience", text: "experience" },
  { href: "#certifications", text: "certifications" },
  {
    href: "https://drive.google.com/file/d/10KQf_MxDJ3aeq6jBeGP7zyPwshlWxN4T/view?usp=sharing",
    text: "[ resume ]",
    target: "_blank",
  },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");
  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
        target={props.target}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Abeer Das",
    description: `Full-stack website developer and TypeScript enthusiast.`,
    image: "/assets/logo.png",
    type: "website",
    ...customMeta,
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#7B82FE" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://www.wendoj.codes${router.asPath}`} />
        <link rel="canonical" href={`https://www.wendoj.codes${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Abeer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/logo.png" />
      </Head>
      <nav className={cn(styles.nav, isScrolled ? "shadow-md backdrop-blur" : "bg-transparent")}>
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(styles.burger, "p-2 rounded-md")}
          >
            <MenuIcon data-hide={isOpen} />
            <CrossIcon data-hide={!isOpen} />
          </button>
        </div>
        <Link href="/"><span className="text-xl">abeer das</span></Link>
        <ul className={styles["desktop-nav"]}>
          {navLinks.map((link, i) => (
            <NavItem key={link.href} {...link} i={i} className="text-base" />
          ))}
        </ul>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed z-40 bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <ul>
                {navLinks.map((link, i) => (
                  <NavItem key={link.href} {...link} i={i} className="text-xl" />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {isLoading && <Preloader />}
      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" {...props}>
      <path d="M2.5 2.5H17.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 12.5H17.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" {...props}>
      <path d="M18 6L6 18" stroke="currentColor" />
      <path d="M6 6l12 12" stroke="currentColor" />
    </svg>
  );
}
