import { NewsItem } from "../core/models/news.model";

export const SAMPLE_NEWS : NewsItem[] = [
    {
        id: 1,
        title: 'Heavy Rains flood Hyderabad Streets',
        imageUrl: 'assets/images/telangana-rain.jpg',
        summary: 'Waterlogging reported in multiple neighbourhoods; civic authorities on alert..',
        time: '1h ago',
        source: 'Local Times',
        link: 'Link',
        important: true,
        category: '',
        language: '',
        state: "",
        country: ""
    },
    {
        id: 2,
        title: 'State Education Board Revises Syllabus',
        imageUrl: "",
        summary: 'New Curriculum to include AI literacy for high school students from next year..',
        time: '3h ago',
        source: 'State Herald',
        link: 'Link',
        important: false,
        category: '',
        language: '',
        state: "",
        country: ""
    },
    {
        id: 3,
        title: 'National Budget Session begins Today',
        imageUrl: "",
        summary: 'Parliament convenes to discuss fiscal allocations and reforms',
        time: '5h ago',
        source: 'Capital Daily',
        link: 'Link',
        important: true,
        category: '',
        language: '',
        state: "",
        country: ""
    },
    {
        id: 4,
        title: 'Global summit on climate change concludes',
        imageUrl: "",
        summary: 'World leaders agree on phased emission targets; finance packages anounced..',
        time: '8h ago',
        source: 'World Report',
        link: 'Link',
        important: false,
        category: '',
        language: '',
        state: "",
        country: ""
    }
];