export const truncateStringStyle = {
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
};
export type ScrollStyleType = {
  bar: {
    width: string | number
  },
  track: {
    background: string
  },
  thumb: {
    background: string,
    borderRadius: number,
    border: string
  },

};
export const scrollBarStyle =(styles: ScrollStyleType) => ({
  "&::-webkit-scrollbar": {
    width: styles.bar.width
  },
  "&::-webkit-scrollbar-track": {
    background: styles.track.background
  },
 "&::-webkit-scrollbar-thumb": {
    backgroundColor: styles.thumb.background,
    borderRadius: styles.thumb.borderRadius,
    border: styles.thumb.border
  }
})