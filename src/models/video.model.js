// bson and json data????
import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            tequired: true
        },
        thumbnail: {
            type: String, //cloudinary url
            tequired: true
        },
        title: {
            type: String, 
            tequired: true
        },
        description: {
            type: String, 
            tequired: true
        },
        duration: {
            type: Number, //cloudinary url
            tequired: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema)

// mongoose -> aggregation pipelines