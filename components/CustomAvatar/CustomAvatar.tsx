import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import Box from '@mui/material/Box';

interface CustomAvatarProps {
  toolbarAvatar: string;
}

const CustomAvatar = ({ toolbarAvatar }: CustomAvatarProps) => {

    const avatarLetterInitials = toolbarAvatar.split(' ').map(name => name[0]).join('').toUpperCase();

    return (
        <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="caption">{avatarLetterInitials}</Typography>
            </Box>
        </Avatar>
    );
};
export default CustomAvatar;