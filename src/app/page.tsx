"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Moon, Sun, Edit3, MapPin, Github, Twitter, Linkedin, Globe,
  Check, X, Code, Layers, Briefcase, GraduationCap, ChevronRight, Phone, Zap,
} from "lucide-react";
import styles from "./page.module.css";
import { PageIntro } from "./components/PageIntro";

/* ──────────────────── Types ──────────────────── */
interface Skill       { id: string; name: string; count: number; }
interface SocialLink  { id: string; platform: string; url: string; }
interface Experience  { id: string; company: string; role: string; startDate: string; endDate: string | null; description: string; }
interface Education   { id: string; institution: string; degree: string; duration: string; score: string | null; }
interface Project     { id: string; title: string; techStack: string; description: string; }
interface Profile {
  id: string; name: string; bio: string;
  profilePicture: string | null; location: string | null;
  email: string | null; phone: string | null;
  skills: Skill[]; socialLinks: SocialLink[];
  experiences: Experience[]; educations: Education[]; projects: Project[];
}

/* ──────────────────── 3D Magnetic Tilt Hook ──────────────────── */
function useMagneticTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), { stiffness: 300, damping: 30 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), { stiffness: 300, damping: 30 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { ref, rotX, rotY, onMouseMove, onMouseLeave };
}

/* ──────────────────── Cosmic Background ──────────────────── */
function CosmicBackground() {
  // Fixed seeds to avoid hydration mismatch (no Math.random() at module-level)
  const particles = [
    { id:0,  x:5,  y:12, s:2.4, d:"#818cf8", dur:18, tx1:30, ty1:-40, tx2:-20, ty2:30 },
    { id:1,  x:18, y:75, s:1.8, d:"#a78bfa", dur:22, tx1:-50, ty1:20, tx2:40, ty2:-30 },
    { id:2,  x:34, y:28, s:3.0, d:"#22d3ee", dur:16, tx1:60, ty1:10, tx2:-15, ty2:50 },
    { id:3,  x:52, y:90, s:1.5, d:"#818cf8", dur:20, tx1:-30, ty1:-60, tx2:45, ty2:15 },
    { id:4,  x:67, y:40, s:2.2, d:"#a78bfa", dur:24, tx1:20, ty1:70, tx2:-40, ty2:-20 },
    { id:5,  x:82, y:15, s:1.9, d:"#22d3ee", dur:17, tx1:-60, ty1:30, tx2:25, ty2:-45 },
    { id:6,  x:91, y:65, s:2.7, d:"#818cf8", dur:21, tx1:40, ty1:-30, tx2:-55, ty2:10 },
    { id:7,  x:25, y:50, s:1.6, d:"#a78bfa", dur:19, tx1:-20, ty1:50, tx2:30, ty2:-60 },
    { id:8,  x:45, y:8,  s:3.1, d:"#22d3ee", dur:23, tx1:55, ty1:-25, tx2:-35, ty2:40 },
    { id:9,  x:73, y:82, s:2.0, d:"#818cf8", dur:15, tx1:-45, ty1:15, tx2:60, ty2:-35 },
    { id:10, x:12, y:38, s:1.7, d:"#a78bfa", dur:25, tx1:35, ty1:60, tx2:-50, ty2:25 },
    { id:11, x:59, y:55, s:2.5, d:"#22d3ee", dur:18, tx1:-25, ty1:-50, tx2:40, ty2:30 },
    { id:12, x:88, y:30, s:1.4, d:"#818cf8", dur:22, tx1:50, ty1:20, tx2:-30, ty2:-55 },
    { id:13, x:38, y:70, s:2.8, d:"#a78bfa", dur:16, tx1:-40, ty1:40, tx2:55, ty2:-15 },
    { id:14, x:6,  y:85, s:2.1, d:"#22d3ee", dur:20, tx1:25, ty1:-55, tx2:-45, ty2:35 },
    { id:15, x:70, y:5,  s:1.3, d:"#818cf8", dur:24, tx1:-60, ty1:30, tx2:20, ty2:-40 },
    { id:16, x:50, y:42, s:2.6, d:"#a78bfa", dur:17, tx1:45, ty1:-20, tx2:-25, ty2:55 },
    { id:17, x:28, y:95, s:1.8, d:"#22d3ee", dur:21, tx1:-35, ty1:55, tx2:60, ty2:-25 },
    { id:18, x:80, y:50, s:2.3, d:"#818cf8", dur:23, tx1:15, ty1:-60, tx2:-50, ty2:20 },
    { id:19, x:42, y:20, s:1.5, d:"#a78bfa", dur:26, tx1:-55, ty1:25, tx2:35, ty2:-30 },
  ];

  return (
    <>
      <div className="grid-bg" />
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.s,
            height: p.s,
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            background: p.d,
            boxShadow: `0 0 ${p.s * 3}px ${p.d}`,
            '--dur': `${p.dur}s`,
            '--tx1': `${p.tx1}px`, '--ty1': `${p.ty1}px`,
            '--tx2': `${p.tx2}px`, '--ty2': `${p.ty2}px`,
            '--tx3': `${p.tx1 - 10}px`, '--ty3': `${p.ty2 + 15}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/* ──────────────────── Project Card (3D Tilt) ──────────────────── */
function ProjectCard({ proj, index }: { proj: Project; index: number }) {
  const { ref, rotX, rotY, onMouseMove, onMouseLeave } = useMagneticTilt(8);
  return (
    <motion.div
      className={styles.projectCardWrapper}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        ref={ref}
        className={styles.projectCard}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles.projectHeader}>
          <Github size={22} className={styles.projectGitIcon} />
          <span className={styles.projectTech}>{proj.techStack}</span>
        </div>
        <h3 className={styles.projectTitle}>{proj.title}</h3>
        <p className={styles.projectDesc}>{proj.description}</p>
        <div className={styles.projectLink}>
          <span>View Details</span>
          <ChevronRight size={14} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────── Section Reveal ──────────────────── */
function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════════════ */
export default function ProfilePage() {
  const [isDark, setIsDark]           = useState(true);
  const [profile, setProfile]         = useState<Profile | null>(null);
  const [loading, setLoading]         = useState(true);
  const [editMode, setEditMode]       = useState(false);
  const [editData, setEditData]       = useState<Partial<Profile>>({});
  const [introComplete, setIntroComplete] = useState(false);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute('data-theme', 'dark');
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setEditData(data);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleEndorse = async (skillId: string) => {
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: skillId }),
      });
      if (res.ok) {
        setProfile(prev => !prev ? prev : {
          ...prev,
          skills: prev.skills
            .map(s => s.id === skillId ? { ...s, count: s.count + 1 } : s)
            .sort((a, b) => b.count - a.count),
        });
      }
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profile.id, ...editData }),
      });
      if (res.ok) { setProfile(await res.json()); setEditMode(false); }
    } catch (e) { console.error(e); }
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':   return <Github size={18} />;
      case 'twitter':  return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      default:         return <Globe size={18} />;
    }
  };

  // Whether page content should be fully visible
  const contentReady = introComplete && !loading && mounted;

  return (
    <>
      {/* ── INTRO ANIMATION — always shows first, fires on every load/refresh ── */}
      <AnimatePresence>
        {!introComplete && mounted && (
          <PageIntro key="page-intro" onFinish={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      {/* ── Cosmic Background (always visible underneath) ── */}
      {mounted && <CosmicBackground />}

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT — 3D perspective-flip reveal after intro
      ══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={contentReady
          ? { opacity: 1, rotateX: "0deg", scale: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, rotateX: "6deg", scale: 0.97, y: 20, filter: "blur(8px)" }
        }
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >

        {/* Profile not found fallback */}
        {!loading && !profile && (
          <div className={styles.loader}>
            <Zap size={32} style={{ color: '#ef4444' }} />
            <span>Profile not found — please seed the database.</span>
          </div>
        )}

        {/* Main portfolio when profile is loaded */}
        {profile && (
          <div className={styles.container}>

            {/* ── Top bar ── */}
            <div className={styles.header}>
              <motion.button
                className="btn-icon"
                onClick={() => setIsDark(d => !d)}
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* ═══════════════════════════════════════
                HERO PROFILE CARD
            ═══════════════════════════════════════ */}
            <motion.div
              className={styles.profileCard}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <div className={styles.nameWrapper}>
                    
                    <h1 className={styles.name}>{profile.name}</h1>
                  </div>
                  <motion.button
                    className="btn-primary"
                    onClick={() => setEditMode(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Edit3 size={15} /> Edit Profile
                  </motion.button>
                </div>

                {/* Meta chips */}
                <div className={styles.metaRow}>
                  {profile.location && (
                    <motion.div className={styles.location}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MapPin size={14} /> {profile.location}
                    </motion.div>
                  )}
                  {profile.phone && (
                    <motion.div className={styles.location}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Phone size={14} /> {profile.phone}
                    </motion.div>
                  )}
                </div>

                {/* Terminal bio */}
                <motion.div
                  className={styles.terminalWindow}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                >
                  <div className={styles.terminalHeader}>
                    <div className={`${styles.terminalDot} ${styles.red}`} />
                    <div className={`${styles.terminalDot} ${styles.yellow}`} />
                    <div className={`${styles.terminalDot} ${styles.green}`} />
                    <span className={styles.terminalTitle}>PROFILE</span>
                  </div>
                  <div className={styles.terminalBody}>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 1 }}
                    >
                      {profile.bio}
                      <span className={styles.typingCursor} />
                    </motion.span>
                  </div>
                </motion.div>

                {/* Social links */}
                <motion.div
                  className={styles.socialRow}
                  style={{ marginTop: '1.75rem' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {profile.socialLinks.map((link, i) => (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.socialLink}
                      aria-label={link.platform}
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.75 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{ y: -5, scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {getIcon(link.platform)}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════
                SKILLS SECTION
            ═══════════════════════════════════════ */}
            <section className={styles.section}>
              <SectionReveal>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper}><Code size={22} /></div>
                  <h2>Tech Stack &amp; Skills</h2>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className={styles.skillsPanel}>
                  <div className={styles.skillsList}>
                    {profile.skills.map((skill, i) => (
                      <motion.div
                        key={skill.id}
                        className={styles.skillBadge}
                        onClick={() => handleEndorse(skill.id)}
                        title="Click to endorse!"
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        whileTap={{ scale: 0.94 }}
                      >
                        <span>{skill.name}</span>
                        <span className={styles.skillCount}>{skill.count}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </section>

            {/* ═══════════════════════════════════════
                EXPERIENCE SECTION
            ═══════════════════════════════════════ */}
            <section className={styles.section}>
              <SectionReveal>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIconWrapper}><Briefcase size={22} /></div>
                  <h2>Professional Experience</h2>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className={styles.timelinePanel}>
                  <div className={styles.timeline}>
                    {profile.experiences.map((exp, i) => (
                      <motion.div
                        key={exp.id}
                        className={styles.timelineItem}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className={styles.timelineDot}>
                          <div className={styles.timelinePulse} />
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.neonBorder} />
                          <h3 className={styles.role}>
                            <ChevronRight size={18} className={styles.roleIcon} />
                            {exp.role}
                          </h3>
                          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap', marginBottom:'0.75rem' }}>
                            <span className={styles.company}>{exp.company}</span>
                            <span className={styles.dates}>
                              {exp.startDate}
                              <span className={styles.dateSeparator}>→</span>
                              {exp.endDate || 'Present'}
                            </span>
                          </div>
                          <div className={styles.timelineDescription}>
                            {exp.description.split('\n').map((line, j) => (
                              <p key={j}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </section>

            {/* ═══════════════════════════════════════
                PROJECTS SECTION
            ═══════════════════════════════════════ */}
            {profile.projects?.length > 0 && (
              <section className={styles.section}>
                <SectionReveal>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionIconWrapper}><Layers size={22} /></div>
                    <h2>Featured Projects</h2>
                  </div>
                </SectionReveal>
                <div className={styles.projectsGrid}>
                  {profile.projects.map((proj, i) => (
                    <ProjectCard key={proj.id} proj={proj} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* ═══════════════════════════════════════
                EDUCATION SECTION
            ═══════════════════════════════════════ */}
            {profile.educations?.length > 0 && (
              <section className={styles.section}>
                <SectionReveal>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionIconWrapper}><GraduationCap size={22} /></div>
                    <h2>Education</h2>
                  </div>
                </SectionReveal>
                <SectionReveal delay={0.1}>
                  <div className={styles.timelinePanel}>
                    <div className={styles.timeline}>
                      {profile.educations.map((edu, i) => (
                        <motion.div
                          key={edu.id}
                          className={styles.timelineItem}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                        >
                          <div className={styles.timelineDot}>
                            <div className={styles.timelinePulse} />
                          </div>
                          <div className={styles.timelineContent}>
                            <div className={styles.neonBorder} />
                            <h3 className={styles.role}>
                              <ChevronRight size={18} className={styles.roleIcon} />
                              {edu.degree}
                            </h3>
                            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexWrap:'wrap', marginBottom:'0.5rem' }}>
                              <span className={styles.company}>{edu.institution}</span>
                              <span className={styles.dates}>{edu.duration}</span>
                            </div>
                            {edu.score && (
                              <div className={styles.scoreBadge}>
                                <span className={styles.prompt}>&gt;</span>
                                Score: <span className={styles.command}>{edu.score}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </section>
            )}

            <div style={{ height: '4rem' }} />
          </div>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════
          EDIT MODAL
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setEditMode(false); }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
                <h2 style={{ fontSize:'1.5rem', fontWeight:800, margin:0 }}>
                  <span style={{ background:'linear-gradient(135deg,#fff,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    Edit Profile
                  </span>
                </h2>
                <motion.button
                  className="btn-icon"
                  onClick={() => setEditMode(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              <div className={styles.editForm}>
                <label>Name</label>
                <input className="input-field" value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                <label>Avatar URL</label>
                <input className="input-field" value={editData.profilePicture || ""}
                  onChange={(e) => setEditData({ ...editData, profilePicture: e.target.value })} />
                <label>Location</label>
                <input className="input-field" value={editData.location || ""}
                  onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
                <label>Phone</label>
                <input className="input-field" value={editData.phone || ""}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                <label>Bio</label>
                <textarea className="input-field" value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })} />

                <div className={styles.editActions}>
                  <button className={styles.btnCancel} onClick={() => setEditMode(false)}>Cancel</button>
                  <motion.button
                    className="btn-primary"
                    onClick={handleSave}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Check size={15} /> Save Changes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
