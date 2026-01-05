
import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';

const Section = ({ title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay * 0.1 }}
        className="mb-12"
    >
        {title && <h3 className="font-display text-2xl md:text-3xl text-[#5A2A45] mb-4 italic">{title}</h3>}
        <div className="text-[#6E5A52] font-outfit text-sm md:text-base leading-relaxed space-y-4">
            {children}
        </div>
    </motion.div>
);

const TermsAndConditions = () => {
    return (
        <div className="bg-[#F1EBDD] min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12">
            <SEO
                title="Terms & Conditions | Love & Nest Studio"
                description="Terms and conditions of photography services provided by Love & Nest Studio."
            />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <span className="block font-outfit text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-[#B77A8C] mb-4">
                        Legal
                    </span>
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#5A2A45] mb-6">
                        Terms & <span className="italic font-light opacity-80">Conditions</span>
                    </h1>
                    <div className="w-16 h-[1px] bg-[#5A2A45]/20 mx-auto"></div>
                </motion.div>

                <div className="bg-white/50 backdrop-blur-sm p-8 md:p-16 rounded-sm border border-[#5A2A45]/5">

                    <Section delay={1}>
                        <p className="font-bold text-[#5A2A45]">TERMS AND CONDITIONS OF PHOTOGRAPHY SERVICES</p>
                        <p>
                            For the purposes of these terms, the term "Photographer" refers to Love & Nest Studio by Anamika Vaishnav,
                            including her team, assistants, and any individuals directly involved in providing photography services.
                            The term "Client" refers to the person or family booking the photography session and includes their
                            representatives, guests, or any associates present during the shoot or event.
                        </p>
                    </Section>

                    <Section title="1. Image Use Policy" delay={2}>
                        <h4 className="font-bold text-[#5A2A45] mb-2 text-lg">Personal Use Only</h4>
                        <p>The Client is granted a limited, non-exclusive, non-transferable, and non-commercial license to use the photographs provided by the Photographer (“Photographs”) exclusively for personal purposes.</p>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">Prohibited Uses</h4>
                        <p>The Client agrees not to use the Photographs for commercial purposes, including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Promotion or marketing of products, services, or businesses.</li>
                            <li>Selling, licensing, or distributing the Photographs to third parties.</li>
                            <li>Featuring the Photographs in publications, online or offline, unless written permission is obtained from the Photographer.</li>
                        </ul>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">Logo on Images</h4>
                        <p>All photographs delivered by Love & Nest Studio will include the studio logo. Unbranded images will not be provided.</p>
                    </Section>

                    <Section title="2. Intellectual Property Rights" delay={3}>
                        <h4 className="font-bold text-[#5A2A45] mb-2 text-lg">1. Copyright Ownership</h4>
                        <p>All photographs created during the session remain the exclusive property of the Photographer. This includes all legal rights to reproduce, distribute, and display the images.</p>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">2. Client’s Usage Rights</h4>
                        <p>Upon receiving the final digital files and/or prints, the Client is granted a non-exclusive, perpetual, non-commercial license for personal use. This license allows the Client to:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Display the photographs in their home or private spaces.</li>
                            <li>Share the photographs with family and friends.</li>
                            <li>Print the photographs for personal use (albums, frames, or gifts).</li>
                            <li>Share the photographs on personal social media profiles.</li>
                        </ul>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">3. Restrictions on Client Use</h4>
                        <p>The Client is strictly prohibited from:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Selling or licensing the photographs to others.</li>
                            <li>Using the photographs for advertisements, marketing campaigns, or any commercial activity without prior written consent.</li>
                            <li>Making significant alterations to the images, beyond minor color or contrast adjustments.</li>
                            <li>Claiming the photographs as their own work.</li>
                        </ul>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">4. Photographer’s Usage Rights</h4>
                        <p>The Client grants the Photographer permission to use the photographs for professional purposes, including:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Showcasing images on the studio’s website, portfolio, or blog.</li>
                            <li>Using images in promotional materials such as brochures, flyers, or social media content.</li>
                            <li>Featuring images in competitions, exhibitions, or workshops.</li>
                        </ul>
                        <p className="mt-2 italic opacity-80 text-sm">All images will be handled with care, respecting the privacy of children and families. The Photographer may tag or collaborate with Clients on social media only if requested.</p>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">5. Purchasing Copyright</h4>
                        <p>The session fee does not include copyright transfer. If the Client wishes to acquire full copyright ownership, this can be arranged through a separate agreement for a specified fee. This transfer grants all rights to the images to the Client.</p>
                    </Section>

                    <Section title="3. Social Media & Sharing" delay={4}>
                        <p><strong>Personal Sharing:</strong> Clients may post images on their personal social media accounts.</p>
                        <p><strong>Restrictions:</strong> Photographs cannot be displayed in any commercial, promotional, or business-related context.</p>
                    </Section>

                    <Section title="4. Commercial Use & Licensing" delay={5}>
                        <p>Clients may not use the images for:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Business promotions, websites, or social media intended for commercial use.</li>
                            <li>Advertising campaigns, banners, or other marketing materials.</li>
                            <li>Distribution to third parties for commercial purposes.</li>
                        </ul>
                        <p className="mt-4"><strong>Commercial License Requests:</strong> Any use beyond personal purposes requires written approval and payment of applicable licensing fees, as determined by the Photographer.</p>
                    </Section>

                    <Section title="5. Limitation of Liability" delay={6}>
                        <p><strong>Data Loss:</strong> In the unlikely event of image loss or corruption, the Photographer’s liability is limited to a refund of fees paid. No additional compensation or damages will be provided.</p>
                        <p><strong>Force Majeure:</strong> The Photographer is not responsible for delays or failure due to uncontrollable circumstances such as natural disasters, equipment failure, or adverse weather.</p>
                    </Section>

                    <Section title="6. Payment & Non-Payment" delay={7}>
                        <p><strong>Payment Terms:</strong> Full payment is due on the day of the shoot via UPI, bank transfer, or cash.</p>
                        <p><strong>Non-Payment:</strong> If payment is not completed within three (3) days post-shoot, the session will be considered cancelled, and the Photographer is under no obligation to deliver the images.</p>
                    </Section>

                    <Section title="7. Cancellation Due to Misconduct" delay={8}>
                        <p>Love & Nest Studio maintains a zero-tolerance policy for abusive, threatening, or harassing behavior towards the Photographer or team. If such behavior occurs, services may be terminated immediately. Examples include:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Verbal abuse, offensive language, or aggression.</li>
                            <li>Physical threats or intimidating gestures.</li>
                        </ul>
                        <p className="mt-4 font-bold">Consequences:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Paid fees or deposits will be forfeited.</li>
                            <li>No obligation to deliver photographs or edits.</li>
                            <li>The Photographer may pursue legal recourse if necessary.</li>
                        </ul>
                    </Section>

                    <Section title="8. Cake Smash Session Policy" delay={9}>
                        <p>A non-refundable advance confirms the booking. Cancellation or rescheduling within 48 hours of the session will result in the loss of the advance. This applies to illness, last-minute changes, or unforeseen circumstances.</p>
                    </Section>

                    <Section title="9. Maternity & Baby Shoot Policy" delay={10}>
                        <h4 className="font-bold text-[#5A2A45] mb-2 text-lg">Maternity Sessions</h4>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Maternity shoots are ideally conducted between 28–34 weeks of pregnancy.</li>
                            <li>Early shoots before 28 weeks may be accommodated only on special request.</li>
                            <li>Maternity shoots will not be conducted after 34 weeks. If a shoot is requested post-34 weeks, it will be done at the Client’s own risk.</li>
                        </ul>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">Newborn Sessions</h4>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Newborn sessions are only offered for babies up to 20 days old.</li>
                            <li>Babies older than 20 days are included under baby or kid shoot packages, with pricing accordingly.</li>
                        </ul>

                        <h4 className="font-bold text-[#5A2A45] mb-2 mt-6 text-lg">Location & Space Considerations</h4>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>Sessions will be scheduled based on studio availability and suitability of the location.</li>
                            <li>The Photographer reserves the right to adjust timing, setup, or location for safety, comfort, and quality of the shoot.</li>
                        </ul>
                    </Section>

                    <Section title="10. Acceptance of Terms" delay={11}>
                        <p>By booking a session, the Client agrees to all terms outlined here. Unauthorized use of images may result in legal action.</p>
                        <p className="mt-4 font-bold text-[#5A2A45]">Acknowledgment: Proceeding with the booking constitutes acceptance of these Terms & Conditions. Non-compliance may result in termination of services.</p>
                    </Section>

                    <div className="mt-16 pt-8 border-t border-[#5A2A45]/10 text-center">
                        <p className="font-display italic text-[#5A2A45] text-xl">Love & Nest Studio</p>
                        <p className="text-[#6E5A52] text-xs uppercase tracking-widest mt-2">Dehradun, India</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
