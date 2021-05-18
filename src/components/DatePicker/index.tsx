import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { dateRangeKey, defaultRange } from "../../commonlib/constants";
import { Range } from "../../commonlib/types";
import { defaultInputRanges, defaultStaticRanges } from "./defaultRanges";
import "./_index.scss";

type RangeDatePickerProps = {
  onChangeRange: (range: Range) => void;
  initialRange?: Range;
};

const RangeDatePicker: React.FunctionComponent<RangeDatePickerProps> = (
  props
) => {
  const [range, setRange] = useState<Range>(
    props.initialRange
      ? { ...props.initialRange, ...dateRangeKey }
      : { ...defaultRange, ...dateRangeKey }
  );
  const [today] = useState(new Date());

  useEffect(() => {
    const range: Range = { ...props.initialRange, ...dateRangeKey };

    setRange(range);
  }, [props.initialRange]);

  const handleSelect = (ranges: any) => {
    setRange(ranges.selection);
    props.onChangeRange(ranges.selection);
  };

  return (
    <DateRangePicker
      maxDate={today}
      ranges={[range]}
      onChange={handleSelect}
      // @ts-ignore
      staticRanges={defaultStaticRanges}
      // @ts-ignore
      inputRanges={defaultInputRanges}
    />
  );
};

export default RangeDatePicker;
