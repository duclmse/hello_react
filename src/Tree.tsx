import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, {TreeItemProps, treeItemClasses} from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import {Mail, Delete,Label,SupervisorAccount,Info, Forum, LocalOffer, ArrowDropDown, ArrowRight} from "@mui/icons-material";
import {SvgIconProps} from "@mui/material/SvgIcon";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, ...other} = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{display: "flex", alignItems: "center", p: 0.5, pr: 0}}>
          <Box component={LabelIcon} color="inherit" sx={{mr: 1}} />
          <Typography variant="body2" sx={{fontWeight: "inherit", flexGrow: 1}}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

export default function GmailTreeView() {
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{width: 24}} />}
      sx={{height: "max-content", flexGrow: 1, maxWidth: 400, overflowY: "auto"}}>
      <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={Mail} />
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={Delete} />
      <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={SupervisorAccount}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Updates"
          labelIcon={Info}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={Forum}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={LocalOffer}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
    </TreeView>
  );
}
