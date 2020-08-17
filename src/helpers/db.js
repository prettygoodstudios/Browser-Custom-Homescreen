//Images for default icons
import githubIcon from "../images/github.png";
import playIcon from "../images/music.png";
import youtubeIcon from "../images/youtube.png";
import driveIcon from "../images/drive.png";


const ICON_DB_NAME = "BROWSER_HOME_SCREEN_ICONS";

const INITIAL_ICON_DB_STATE = [
    {
        url: "https://github.com/prettygoodstudios",
        icon: githubIcon,
        editing: false,
        id: 0
    },
    {
        url: "https://music.google.com",
        icon: playIcon,
        editing: false,
        id: 1
    },
    {
        url: "https://youtube.com",
        icon: youtubeIcon,
        editing: false,
        id: 2
    },
    {
        url: "https://drive.google.com",
        icon: driveIcon,
        editing: false,
        id: 3
    }
];

export const initializeDB = () => {
    if(!localStorage.getItem(ICON_DB_NAME)){
        localStorage.setItem(ICON_DB_NAME, JSON.stringify(INITIAL_ICON_DB_STATE));
    }
}

export const getItemsFromDB = () => {
    initializeDB();
    const icons = JSON.parse(localStorage.getItem(ICON_DB_NAME))
    if (!icons){
        return [];
    }
    return icons;
}

export const updateIconDB = (icons) => {
    localStorage.setItem(ICON_DB_NAME, JSON.stringify(icons));
} 