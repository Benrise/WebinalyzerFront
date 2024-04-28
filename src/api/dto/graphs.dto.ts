export class GraphsDto {
  id: string = '';
  msg_length?: {
    [id: number]: {
      total_messages: number;
      min_length: number;
      max_length: number;
      average_length: number;
      hist: number[];
    };
  };
  msg_count?: {
    [id: number]: {
      [range: string]: number;
    };
  };
  msg_length_time?: {
    [id: number]: {
      minutes_since_start: number[];
      message_lengths: number[];
    };
  };
  msg_emotions?: {
    [id: number]: {
      [emotion: string]: number;
    };
  };
  smth_wrong?: string;
  msg_bad_words?: {
    emails: string[];
    emails_number: number;
    links: string[];
    links_number: number;
    bad_words: string[];
    bad_words_number: number;
  };
}
