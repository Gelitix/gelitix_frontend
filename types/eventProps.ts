type TicketType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type EventProps = {
  location: string;
  description: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  ticketTypes: TicketType[];
  id: string;
};

export type EventDetailProps = {
  event: EventProps;
};
