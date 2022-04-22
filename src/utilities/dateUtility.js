export const WeekDaysTime = {
  monday: {
    openingTime: null,
    closingTime: null,
  },
  tuesday: {
    openingTime: null,
    closingTime: null,
  },
  wednesday: {
    openingTime: null,
    closingTime: null,
  },
  thursday: {
    openingTime: null,
    closingTime: null,
  },
  friday: {
    openingTime: null,
    closingTime: null,
  },
  saturday: {
    openingTime: null,
    closingTime: null,
  },
  sunday: {
    openingTime: null,
    closingTime: null,
  },
};

export const setWeekDays = (availability) => {
  return {
    monday: {
      openingTime: availability?.monday?.openingTime ?? null,
      closingTime: availability?.monday?.closingTime ?? null,
    },
    tuesday: {
      openingTime: availability?.tuesday?.openingTime ?? null,
      closingTime: availability?.tuesday?.closingTime ?? null,
    },
    wednesday: {
      openingTime: availability?.wednesday?.openingTime ?? null,
      closingTime: availability?.wednesday?.closingTime ?? null,
    },
    thursday: {
      openingTime: availability?.thursday?.openingTime ?? null,
      closingTime: availability?.thursday?.closingTime ?? null,
    },
    friday: {
      openingTime: availability?.friday?.openingTime ?? null,
      closingTime: availability?.friday?.closingTime ?? null,
    },
    saturday: {
      openingTime: availability?.saturday?.openingTime ?? null,
      closingTime: availability?.saturday?.closingTime ?? null,
    },
    sunday: {
      openingTime: availability?.sunday?.openingTime ?? null,
      closingTime: availability?.sunday?.closingTime ?? null,
    },
  };
};
