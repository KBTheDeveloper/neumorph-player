import "@testing-library/jest-dom";
import * as React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "../../../../utils/SVGMocks";
import RangeSlider from "../";

afterEach(cleanup);

test("render volume slider", async () => {
  const { getByTestId } = render(
    <RangeSlider
      theme='dark'
      view='round-vertical'
      color='orange'
      orientation='vertical'
      onChange={() => {}}
      sizes={{ width: 10 }}
      start={50}
      min={0}
      max={100}
    />,
  );
  await waitFor(() => expect(getByTestId("range-slider")).toBeTruthy());
});
