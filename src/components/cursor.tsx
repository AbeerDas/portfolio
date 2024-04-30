import { useEffect, useState } from 'react';

const Cursor = () => {
  const [xp, setXp] = useState(0);
  const [yp, setYp] = useState(0);
  const [xpDot, setXpDot] = useState(0);
  const [ypDot, setYpDot] = useState(0);

  useEffect(() => {
    const cursorFollower = document.querySelector(".cursorFollower");

    const handleMouseMove = (e: MouseEvent) => {
      setXp(e.pageX);
      setYp(e.pageY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setXp((prevXp) => prevXp + (xp - prevXp) / 15);
      setYp((prevYp) => prevYp + (yp - prevYp) / 15);

      const cursorFollower = document.querySelector(".cursorFollower") as HTMLElement;
      if (cursorFollower) {
        cursorFollower.style.left = `${xp}px`;
        cursorFollower.style.top = `${yp}px`;
      }
    });

    return () => clearInterval(interval);
  }, [xp, yp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setXpDot((prevXpDot) => prevXpDot + (xp - prevXpDot) / 25);
      setYpDot((prevYpDot) => prevYpDot + (yp - prevYpDot) / 25);

      const cursorFollowerDot = document.querySelector(".cursorFollowerDot") as HTMLElement | null;
      if (cursorFollowerDot) {
        cursorFollowerDot.style.left = `${xpDot}px`;
        cursorFollowerDot.style.top = `${ypDot}px`;
      }
    });

    return () => clearInterval(interval);
  }, [xpDot, ypDot]);

  return (
    <>
      <span className="cursorFollower" />
      <span className="cursorFollowerDot" />
    </>
  );
};

export default Cursor;
