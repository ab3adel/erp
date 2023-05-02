import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const GenericTreeViewDefaultIcon = ({
  type,
}: GenericTreeViewDefaultIconProps) => {
  switch (type) {
    case (type = "collapsed"): {
      return (
        <KeyboardArrowUpIcon sx={{ color: "common.black" }} />
      );
    }
    case (type = "expanded"): {
      return (
        <KeyboardArrowDownIcon sx={{ color: "common.black" }} />
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
