import {
  Avatar,
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
// material-ui
import { useTheme } from "@mui/material/styles";
import { CompletionStatus } from "isomorphic-lib/src/types";
import React, { useRef, useState } from "react";

import { useAppStore } from "../../../../lib/appStore";
import isNode from "../../../../lib/isNode";
// project import
import MainCard from "../../../mainCard";
import Transitions from "../../../transitions";
import ProfileTab from "./profile/profileTab";

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

function Profile() {
  const theme = useTheme();

  const anchorRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (isNode(event.target) && anchorRef.current?.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";
  const member = useAppStore((store) => store.member);
  const name = member
    ? member.name ?? member.nickname ?? member.email
    : "Anonymous";
  const workspace = useAppStore((store) => store.workspace);
  const workspaceName =
    workspace.type === CompletionStatus.Successful
      ? workspace.value.name
      : "Default";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar
            alt="profile user"
            sx={{ width: 32, height: 32 }}
            src={member?.picture}
          />
          <Typography variant="subtitle1">{name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open ? (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down("md")]: {
                    maxWidth: 250,
                  },
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            alignItems="center"
                          >
                            <Avatar
                              alt="profile user"
                              src={member?.picture}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack>
                              <Typography variant="h6">{name}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {workspaceName} Workspace
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <ProfileTab />
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            ) : null}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

export default Profile;
