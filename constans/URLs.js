export const SUBTITLE_FOR_YOUTUBE = "https://subtitles-for-youtube.p.rapidapi.com/subtitles/";
export const SUBTITLE_FOR_YOUTUBE_QUERY = "?translated=None&type=None&lang=en&rapidapi-key=";
export const CreateSubtitleForYoutube = (slug) => {
  const baseURL = `${SUBTITLE_FOR_YOUTUBE}${slug}`;
  const queryURL = `${SUBTITLE_FOR_YOUTUBE_QUERY}${process.env.NEXT_PUBLIC_API_KEY}`;
  const url = `${baseURL}${queryURL}`;
  return url;
}