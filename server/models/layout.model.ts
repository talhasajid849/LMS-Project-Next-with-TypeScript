import { Document, model, Schema } from "mongoose";


interface FaqItem extends Document{
    question: string,
    answer: string
}


interface Category extends Document{
    title: string,
}

interface BannerImages extends Document{
    public_id: string;
    url: string;
}

interface Layout extends Document{
    type: string
    faq: FaqItem[];
    categories: Category[];
    banner:{
        image: BannerImages;
        title: string;
        subTitle: string;
    }
}


const faqSchema = new Schema<FaqItem> ({
    question: {type: String},
    answer: {type: String},
});

const categorySchema = new Schema<Category> ({
    title: {type: String},
});


const BannerImagesSchema = new Schema<BannerImages> ({
    public_id: {type: String},
    url: {type: String},
});


const layoutSchemna = new Schema<Layout> ({
    type: {type: String},
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: BannerImagesSchema,
        title: {type:String},
        subTitle: {type: String},
    },
});


const LayoutModel = model<Layout>('Layout LMS', layoutSchemna);
export default LayoutModel;


