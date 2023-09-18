import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const StyledRating = withStyles({
  // iconFilled: {
  //   color: "#48afc9",
  // },
  // iconHover: {
  //   color: "#48afc9",
  // },
})(Rating);

export default function RatingComponent({
  defaultValue,
  readOnly,
  size,
  onChange,
}) {
  return (
    <StyledRating
      defaultValue={defaultValue}
      readOnly={readOnly}
      precision={0.5}
      size={size}
      onChange={(e, v) => onChange(v)}
    />
  );
}
