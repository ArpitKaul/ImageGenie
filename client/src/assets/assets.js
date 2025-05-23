import logo from './logo.svg'
import logo_icon from './logo_icon.svg'
import facebook_icon from './facebook.png'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter.webp'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import ai from './ai-1.png'
import ai1 from './ai-2.webp'
import ai2 from './ai-3.png'
import ai3 from './ai-4.avif'
import ai4 from './ai-5.avif'
import ai5 from './ai-6.webp'
import ai6 from './ai-7.webp'
import ai8 from './ai8.jpeg'
import model from './model.png'
import insta from './insta.webp'
import color from './color.png'
import chrac from './chracter.webp'
import cover from './cover.jpg'
import title from './title.png'
import chrac1 from './chracter1.webp'
import cover1 from './cover1.jpg'
import title1 from './title1.png'



export const assets = {
    logo,
    insta,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    ai,
    ai1,
    ai2,
    ai3,
    ai4,
    ai5,
    ai6,
    ai8,
    model,
    color,
    chrac,
    title,
    cover,
    chrac1,
    title1,
    cover1
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
      image: ai8
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
      image: ai1
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
      image: ai2
    },
  ];

export const testimonialsData = [
    {
        image:profile_img_1,
        name:'Donald Jackman',
        role:'Graphic Designer',
        stars:5,
        text:`I've been using ImageGenie for nearly two years, primarily for Instagram, and it has been an amazing experience..`
    },
    {
        image:profile_img_2,
        name:'Richard Nelson',
        role:'Content Creator',
        stars:4,
        text:`ImageGenie is an incredible tool! I've been using it for nearly two years, and it never fails to generate stunning images from text.`
    },
    {
        image:profile_img_1,
        name:'Donald Jackman',
        role:' Graphic Designer',
        stars:5,
        text:`ImageGenie has been a game-changer for my creative work. The text-to-image generation is fast and delivers amazing results.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]