import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Users, GraduationCap, Search, Heart, ShieldCheck } from 'lucide-react';
import { waliAsuhData, WaliAsuhGroup } from './data';

export default function App() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGroup = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredData = waliAsuhData.filter(group => 
    group.waliNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.anakAsuh.some(anak => anak.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#1a1a1a] font-sans selection:bg-[#1e40af] selection:text-white">
      {/* Header Section */}
      <header className="bg-[#1e3a8a] border-b border-[#1e40af] sticky top-0 z-50 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Wali Asuh SRMA 24
                </h1>
                <p className="text-xs font-medium text-blue-200 uppercase tracking-widest">
                  Kediri, Jawa Timur
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-blue-100">
              <Heart className="w-4 h-4 fill-current text-blue-300" />
              <span className="text-xs font-semibold uppercase tracking-wider">Pendampingan</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Cari nama wali atau anak asuh..."
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 focus:bg-white/20 focus:ring-2 focus:ring-white/20 focus:border-white/30 rounded-2xl text-sm transition-all outline-none text-white placeholder:text-blue-200/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-medium text-[#1a1a1a] mb-2">Daftar Pendampingan</h2>
          <p className="text-sm text-[#8e9299]">
            Menampilkan {filteredData.length} kelompok wali asuh yang terdaftar.
          </p>
        </div>

        <div className="space-y-4">
          {filteredData.map((group) => (
            <WaliGroupCard 
              key={group.id} 
              group={group} 
              isExpanded={expandedId === group.id}
              onToggle={() => toggleGroup(group.id)}
            />
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#e5e5e0]">
              <Search className="w-12 h-12 text-[#e5e5e0] mx-auto mb-4" />
              <p className="text-[#8e9299] font-medium">Tidak ada hasil yang ditemukan.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#1e3a8a] font-semibold text-sm hover:underline"
              >
                Bersihkan pencarian
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-12 text-center border-t border-[#e5e5e0] mt-12">
        <p className="text-xs text-[#8e9299] font-medium uppercase tracking-widest mb-2">
          SRMA 24 Kediri
        </p>
        <p className="text-[10px] text-[#b0b0a8]">
          &copy; {new Date().getFullYear()} Aplikasi Wali Asuh. Dibuat dengan penuh dedikasi.
        </p>
      </footer>
    </div>
  );
}

interface WaliGroupCardProps {
  group: WaliAsuhGroup;
  isExpanded: boolean;
  onToggle: () => void;
  key?: string | number;
}

function WaliGroupCard({ 
  group, 
  isExpanded, 
  onToggle 
}: WaliGroupCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
        isExpanded ? 'border-[#1e3a8a] shadow-xl shadow-[#1e3a8a]/5 ring-1 ring-[#1e3a8a]/10' : 'border-[#e5e5e0] hover:border-[#1e3a8a]/30 hover:shadow-md'
      }`}
    >
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl transition-colors ${isExpanded ? 'bg-[#1e3a8a] text-white' : 'bg-[#f0f4f8] text-[#1e3a8a] group-hover:bg-[#1e3a8a]/10'}`}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#1a1a1a] leading-tight group-hover:text-[#1e3a8a] transition-colors">
              {group.waliNames}
            </h3>
            <p className="text-xs text-[#8e9299] mt-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              {group.anakAsuh.length} Anak Asuh
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`p-1 rounded-full ${isExpanded ? 'bg-[#1e3a8a]/10 text-[#1e3a8a]' : 'text-[#8e9299]'}`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-[#f0f4f8]">
              <div className="grid grid-cols-1 gap-2">
                {group.anakAsuh.map((anak, index) => (
                  <motion.div
                    key={anak.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0f4f8] group/item transition-colors"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#b0b0a8] w-5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-[#4a4a4a] group-hover/item:text-[#1e3a8a]">
                      {anak.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
