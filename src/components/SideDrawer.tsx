import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { navigate } from '@reach/router';
import clsx from 'clsx';
import React from 'react';
import AideaNavigation from './Navigation';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const paths = [
  { label: 'Ideas', path: '/ideas' }
]

const onNavClick = (path: string) => (event: any) => {
  event.preventDefault()
  navigate(path)
}

export default function SideDrawer() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (isOpen: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(isOpen);
  };
  
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {paths.map(({ label, path }, index) => (
          <ListItem button key={label} onClick={onNavClick(path)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <AideaNavigation 
            isDrawerOpen={isOpen}
            toggleDrawer={toggleDrawer(true)}
        />
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
        </Drawer>
        </React.Fragment>
    </div>
  );
}
