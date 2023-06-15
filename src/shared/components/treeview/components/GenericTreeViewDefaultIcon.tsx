import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const GenericTreeViewDefaultIcon = ({
  type,
}: GenericTreeViewDefaultIconProps) => {
  switch (type) {
    case (type = "collapsed"): {
      return (
        <KeyboardArrowDownIcon sx={{ color: "common.black" }} />
      );
    }
    case (type = "expanded"): {
      return (
        <KeyboardArrowRight sx={{ color: "common.black" }} />
      );
    }
    default: {
      return <></>;
    }
  }
};

type GenericTreeViewDefaultIconProps = {
  type: "collapsed" | "expanded";
};
