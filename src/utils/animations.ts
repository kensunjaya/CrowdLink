export const enterBottom = {
    before: {
        y: 150,
        opacity: 0,
    },
    after: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.1,
        }
    },
};

export const enterLeft = {
    before: {
      x: -100,
      opacity: 0,
    },
    after: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      }
    },
  };
  
export const enterRight = {
    before: {
      x: 100,
      opacity: 0,
    },
    after: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      }
    },
  };

export const fadeIn = {
    before: {
        opacity: 0,
    },
    after: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 1,
            staggerChildren: 0.1,
        }
    },
  };