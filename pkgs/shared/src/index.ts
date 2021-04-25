import evt from 'evt';

const { Evt } = evt;
const logger = Evt.create<string>();
logger.attach((message) => {
  console.log(message);
});

export const negotiate = (message: string): void => {
  logger.post(message);
};
