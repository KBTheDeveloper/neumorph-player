export const bgCoverSet = ({size, repeat = "no-repeat", position = "center"}) => ({
  backgroundSize: size,
  backgroundRepeat: repeat ? "repeat" : "no-repeat",
  backgroundPosition: position
});