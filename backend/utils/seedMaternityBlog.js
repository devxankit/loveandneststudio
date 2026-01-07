const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BlogPost = require('../models/BlogPost');

dotenv.config({ path: './.env' });

const seedMaternityBlog = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const slug = "best-time-maternity-photoshoot";

        // Remove if exists to update content
        await BlogPost.deleteOne({ slug });

        const htmlContent = `
<p class="lead text-lg md:text-xl font-light leading-relaxed mb-8">Pregnancy is one of the most profound and beautiful journeys of a woman’s life — a time filled with anticipation, transformation, and quiet strength. A maternity photoshoot is not just about photographs; it is about <span class="text-[#B77A8C]">preserving this fleeting chapter with elegance, emotion, and grace</span>. One of the most common questions expectant mothers ask is:</p>

<h2 class="text-3xl md:text-4xl font-display text-center italic text-[#B77A8C] my-10">When is the best time for a maternity shoot?</h2>

<p>Based on professional experience and maternal comfort, <strong class="text-[#5A2A45]">28 to 32 weeks of pregnancy</strong> is considered the most ideal window for a maternity photoshoot. Here’s why this phase offers the perfect balance of beauty, safety, and comfort.</p>

<hr class="my-10 border-[#5A2A45]/20 w-1/2 mx-auto" />

<div class="space-y-10">
    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">1. A Beautifully Defined Baby Bump</h3>
        <p>Between <strong>28 and 32 weeks</strong>, the baby bump is perfectly visible and gracefully rounded. At this stage, the bump has a well-defined shape that photographs beautifully, creating timeless and elegant portraits without appearing overly heavy or uncomfortable.</p>
    </div>

    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">2. Energy, Comfort & Confidence</h3>
        <p>During this phase, most expecting mothers still feel energetic and emotionally balanced. You can stand, walk, and move comfortably, which allows for a relaxed and enjoyable shoot experience. Natural smiles, calm expressions, and confident poses come effortlessly when the body feels supported.</p>
    </div>

    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">3. Lower Risk & Peace of Mind</h3>
        <p>As pregnancy progresses, there is always a possibility of early delivery or sudden medical concerns, which may result in missing a planned shoot. Scheduling your maternity session between 28 and 32 weeks significantly reduces these risks and allows you to plan your shoot with peace of mind and assurance.</p>
    </div>

    <img src="/images/blog/maternity/maternity-1.png" alt="Peaceful Maternity Moment" class="w-full h-auto my-8 rounded-[2rem] shadow-lg aspect-video object-cover" />

    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">4. More Posing Options, Gracefully</h3>
        <p>This period allows you to explore a wide range of poses with ease:</p>
        <ul class="list-disc pl-5 space-y-2 marker:text-[#B77A8C]">
            <li>Elegant standing poses</li>
            <li>Comfortable sitting poses</li>
            <li>Safe and relaxed lying-down poses</li>
        </ul>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 items-center">
            <img src="/images/blog/maternity/maternity-2.png" alt="Couple Posing" class="w-full h-full object-cover rounded-[1.5rem] shadow-md" />
            <p class="text-sm italic text-[#8F8A86]">"Sitting and reclining poses are especially safe and strain-free, making them ideal for longer sessions. This flexibility enables the photographer to create a rich variety of artistic and luxurious images."</p>
        </div>
    </div>

    <img src="/images/blog/maternity/maternity-3.png" alt="Joyful Experience" class="w-full h-auto my-8 rounded-[2rem] shadow-lg aspect-[21/9] object-cover" />

    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">5. A Joyful Experience — Not a Struggle</h3>
        <p>In the later weeks of pregnancy (after 33–34 weeks), fatigue, back pain, swelling, and breathlessness often increase. At that point, many mothers feel the need to “just finish the shoot somehow.” However, when planned at the right time, your maternity shoot becomes an experience to cherish — unhurried, calm, and truly enjoyable.</p>
    </div>

    <div>
        <h3 class="font-display text-2xl text-[#5A2A45] mb-3">6. Styling Looks More Elegant & Effortless</h3>
        <p>From flowing gowns to draped silhouettes, outfits sit beautifully on the body during this stage. Styling feels effortless, fittings are more comfortable, and experimenting with premium fabrics and silhouettes becomes easier — adding a refined, editorial touch to your photographs.</p>
    </div>
</div>

<div class="bg-[#F9F7F2] p-8 md:p-10 rounded-[2rem] my-12 border border-[#5A2A45]/10 shadow-sm relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-[#E8CBB6]/10 rounded-bl-full"></div>
    <h3 class="mt-0 font-display text-2xl text-[#5A2A45] relative z-10">A Note from Love & Nest Studio by Anamika</h3>
    <p class="mb-0 text-[#6E5A52] relative z-10">At Love & Nest Studio by Anamika, we believe maternity photography is an art — one that honours motherhood with softness, strength, and refined elegance. Every session is thoughtfully designed to ensure comfort, safety, and a calm, luxurious experience, allowing you to simply be present in this beautiful phase of life.</p>
</div>

<div class="text-center my-12">
    <h3 class="font-display text-3xl text-[#5A2A45]">Start Your Journey</h3>
    <p class="italic text-[#8F8A86]">For mothers who value grace over haste.</p>
    
    <p class="max-w-2xl mx-auto my-6">At Love & Nest Studio by Anamika, we create calm, intimate, and thoughtfully curated maternity portraits — designed around your comfort, rhythm, and personal story. Each session begins not with a booking form, but with a quiet conversation.</p>
    
    <p>If you feel drawn to preserving this chapter in a refined, unhurried way, you’re welcome to connect with us and explore what feels right for you.</p>
    
    <p class="font-display text-2xl text-[#B77A8C] mt-6">✨ Some journeys are meant to be remembered gently.</p>
</div>

<hr class="my-10 border-[#5A2A45]/20 w-1/2 mx-auto" />

<div class="bg-white p-6 rounded-xl border-l-4 border-[#B77A8C] italic text-lg text-[#6E5A52]">
    <p class="mb-4"><strong>Final Note:</strong> A maternity photoshoot is a quiet celebration of motherhood — of grace, resilience, and the miracle of new life. Choosing the right time ensures this celebration is captured effortlessly, without haste or discomfort.</p>
    <p class="mb-0">For mothers who seek a serene, safe, and truly magazine-worthy maternity photography experience, <strong>28 to 32 weeks</strong> remains the most exquisite time — when you feel radiant, confident, and free to enjoy every moment.</p>
</div>

<p class="text-center font-bold mt-12 text-[#5A2A45] tracking-wide uppercase text-sm">✨ At Love & Nest Studio by Anamika, we capture not just photographs — we preserve emotions, beautifully and forever.</p>
`;

        await BlogPost.create({
            title: "When Is the Best Time to Plan Your Maternity Photoshoot?",
            slug: slug,
            excerpt: "Pregnancy is one of the most profound and beautiful journeys of a woman’s life. Discover why 28 to 32 weeks is the perfect window for capturing this fleeting chapter.",
            content: htmlContent,
            coverImage: "/images/blog/maternity/maternity-cover.png",
            tags: ["Maternity", "Guide", "Tips"],
            isPublished: true,
            author: "Anamika",
            publishedAt: new Date()
        });

        console.log('Maternity blog post seeded successfully.');
        process.exit(0);

    } catch (error) {
        require('fs').writeFileSync('seed_error.txt', error.toString() + '\\n' + error.stack);
        console.error('Error seeding blog written to seed_error.txt');
        process.exit(1);
    }
};

seedMaternityBlog();
