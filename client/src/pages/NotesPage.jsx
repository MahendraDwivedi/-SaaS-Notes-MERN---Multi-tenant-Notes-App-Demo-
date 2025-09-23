// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { me, getNotes, createNote, deleteNote, upgradeTenant } from '../api';

// // export default function NotesPage() {
// //   const [user, setUser] = useState(null);
// //   const [notes, setNotes] = useState([]);
// //   const [title, setTitle] = useState('');
// //   const [content, setContent] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem('token');

// //   useEffect(() => {
// //     if (!token) return navigate('/');
// //     async function load() {
// //       try {
// //         const u = await me(token);
// //         setUser(u);
// //         const ns = await getNotes(token);
// //         setNotes(ns);
// //       } catch (err) {
// //         console.error(err);
// //         setError(err.message || 'Error');
// //         if (err.message.includes('Unauthorized')) {
// //           localStorage.removeItem('token');
// //           navigate('/');
// //         }
// //       }
// //     }
// //     load();
// //   }, [token, navigate]);

// //   async function onCreate(e) {
// //     e.preventDefault();
// //     setError('');
// //     try {
// //       const note = await createNote(token, { title, content });
// //       setNotes(prev => [note, ...prev]);
// //       setTitle(''); setContent('');
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   }

// //   async function onDelete(id) {
// //     try {
// //       await deleteNote(token, id);
// //       setNotes(prev => prev.filter(n => n._id !== id));
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   }

// //   async function onUpgrade() {
// //     setError('');
// //     try {
// //       await upgradeTenant(token, user.tenant);
// //       const ns = await getNotes(token);
// //       setNotes(ns);
// //       alert('Upgraded to Pro');
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   }

// //   if (!user) return <div>Loading...</div>;

// //   const reachedLimit = notes.length >= 3;

// //   return (
// //     <div>
// //       <div style={{ marginBottom: 10 }}>
// //         Logged in as: <strong>{user.email}</strong> (role: {user.role}) — tenant: <strong>{user.tenant}</strong>
// //         <button style={{ float: 'right' }} onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Logout</button>
// //       </div>

// //       <h3>Create note</h3>
// //       <form onSubmit={onCreate}>
// //         <div><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%'}}/></div>
// //         <div><textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} style={{width:'100%',height:80}}/></div>
// //         <div style={{ marginTop: 8 }}>
// //           <button>Create</button>
// //         </div>
// //       </form>

// //       {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}

// //       {reachedLimit && (
// //         <div style={{ marginTop: 10, padding: 10, border: '1px dashed #333' }}>
// //           <strong>Free plan note limit reached (3 notes).</strong>
// //           {user.role === 'admin' ? (
// //             <div>
// //               <button onClick={onUpgrade}>Upgrade to Pro</button>
// //             </div>
// //           ) : (
// //             <div>Ask your admin to upgrade the tenant to Pro.</div>
// //           )}
// //         </div>
// //       )}

// //       <h3 style={{ marginTop: 20 }}>Notes</h3>
// //       <div>
// //         {notes.length === 0 && <div>No notes yet.</div>}
// //         {notes.map(note => (
// //           <div key={note._id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 8 }}>
// //             <div style={{ display:'flex', justifyContent:'space-between' }}>
// //               <strong>{note.title}</strong>
// //               <button onClick={() => onDelete(note._id)}>Delete</button>
// //             </div>
// //             <div style={{ color: '#555' }}>{note.content}</div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   me,
//   getNotes,
//   getNote,
//   createNote,
//   updateNote,
//   deleteNote,
//   upgradeTenant,
//   inviteUser,
// } from "../api";

// export default function NotesPage() {
//   const [user, setUser] = useState(null);
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [error, setError] = useState("");
//   const [inviteEmail, setInviteEmail] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//  useEffect(() => {
//     if (!token) return navigate("/");
//     async function load() {
//       try {
//         const u = await me(token);
//         setUser(u);
//         const ns = await getNotes(token);
//         setNotes(ns);
//       } catch (err) {
//         console.error(err);
//         console.log(notes);
        
//         setError(err.message);
//         localStorage.removeItem("token");
//         navigate("/");
//       }
//     }
//     load();
//   }, [token, navigate]);

//   async function onCreate(e) {
//     e.preventDefault();
//     setError("");
//     try {
//       const note = await createNote(token, { title, content });
//       setNotes((prev) => [note, ...prev]);
//       setTitle("");
//       setContent("");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function onDelete(id) {
//     try {
//       await deleteNote(token, id);
//       setNotes((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function onView(id) {
//     try {
//       const note = await getNote(token, id);
//       alert(`Note:\n\n${note.title}\n\n${note.content}`);
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function onEdit(note) {
//     const newTitle = prompt("Edit title:", note.title);
//     const newContent = prompt("Edit content:", note.content);
//     if (!newTitle || !newContent) return;
//     try {
//       const updated = await updateNote(token, note._id, {
//         title: newTitle,
//         content: newContent,
//       });
//       setNotes((prev) => prev.map((n) => (n._id === note._id ? updated : n)));
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function onUpgrade() {
//     try {
//       await upgradeTenant(token, user.tenant);
//       alert("Tenant upgraded to Pro");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function onInvite(e) {
//     e.preventDefault();
//     try {
//       await inviteUser(token, user.tenant, inviteEmail);
//       alert(`Invited ${inviteEmail}`);
//       setInviteEmail("");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   if (!user) return <div>Loading...</div>;

//   const reachedLimit = notes.length >= 3;

//   return (
//     <div>
//       <div style={{ marginBottom: 10 }}>
//         Logge in as: <strong>{user.email}</strong> (role: {user.role}) — tenant:{" "}
//         <strong>{user.tenant}</strong>
//         <button
//           style={{ float: "right" }}
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/");
//           }}
//         >
//           Logout
//         </button>
//       </div>

//       <h3>Create Note</h3>
//       <form onSubmit={onCreate}>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ width: "100%" }}
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           style={{ width: "100%", height: 80 }}
//         />
//         <button>Create</button>
//       </form>

//       {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

//       {reachedLimit && (
//         <div style={{ marginTop: 10, border: "1px dashed red", padding: 10 }}>
//           Free plan limit reached (3 notes).
//           {user.role === "admin" ? (
//             <button onClick={onUpgrade}>Upgrade to Pro</button>
//           ) : (
//             <p>Ask your admin to upgrade</p>
//           )}
//         </div>
//       )}

//       {user.role === "admin" && (
//         <div style={{ marginTop: 20 }}>
//           <h3>Invite User</h3>
//           <form onSubmit={onInvite}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={inviteEmail}
//               onChange={(e) => setInviteEmail(e.target.value)}
//               style={{ width: "100%" }}
//             />
//             <button>Invite</button>
//           </form>
//         </div>
//       )}

//       <h3 style={{ marginTop: 20 }}>Notes</h3>
//       {notes.map((note) => (
//         <div
//           key={note._id}
//           style={{ border: "1px solid #ddd", padding: 10, marginBottom: 8 }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <strong>{note.title}</strong>
//             <div>
//           <button onClick={() => navigate(`/notes/${note._id}`)}>View</button>;
//               <button onClick={() => onEdit(note)}>Edit</button>
//               <button onClick={() => onDelete(note._id)}>Delete</button>
//             </div>
//           </div>
//           <div>{note.content}</div>
//         </div>
//       ))}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  LogOut, 
  User, 
  Mail, 
  Crown, 
  UserPlus, 
  AlertCircle,
  FileText,
  Building,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router";
import {
  me,
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  upgradeTenant,
  inviteUser,
  getTenantPlan,   // ✅ new import
} from "../api";

export default function NotesPage() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [plan, setPlan] = useState("free");   // ✅ track plan
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
    async function load() {
      try {
        const u = await me(token);
        setUser(u);

        const ns = await getNotes(token);
        setNotes(ns);

        // ✅ fetch tenant plan
        const p = await getTenantPlan(token, u.tenant);
        setPlan(p.plan);
        console.log(plan);
        
      } catch (err) {
        console.error(err);
        setError(err.message);
        localStorage.removeItem("token");
        navigate("/");
      }
    }
    load();
  }, [token, navigate]);

  async function onCreate(e) {
    e.preventDefault();
    setError("");
    try {
      const note = await createNote(token, { title, content });
      setNotes((prev) => [note, ...prev]);
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function onDelete(id) {
    try {
      await deleteNote(token, id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function onView(id) {
    try {
      const note = await getNote(token, id);
      alert(`Note:\n\n${note.title}\n\n${note.content}`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function onEdit(note) {
    const newTitle = prompt("Edit title:", note.title);
    const newContent = prompt("Edit content:", note.content);
    if (!newTitle || !newContent) return;
    try {
      const updated = await updateNote(token, note._id, {
        title: newTitle,
        content: newContent,
      });
      setNotes((prev) => prev.map((n) => (n._id === note._id ? updated : n)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function onUpgrade() {
    try {
      await upgradeTenant(token, user.tenant);
      alert("Tenant upgraded to Pro");
      setPlan("pro");   // ✅ reflect new plan in UI
    } catch (err) {
      setError(err.message);
    }
  }

  async function onInvite(e) {
    e.preventDefault();
    try {
      await inviteUser(token, user.tenant, inviteEmail);
      alert(`Invited ${inviteEmail}`);
      setInviteEmail("");
    } catch (err) {
      setError(err.message);
    }
  }

  const reachedLimit = plan === "free" && notes.length >= 3;   // ✅ updated condition

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading your notes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {user.role === 'admin' ? <Crown className="w-3 h-3 mr-1" /> : null}
                  {user.role}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Building className="w-4 h-4" />
                <span>{user.tenant}</span>
              </div>
              
              <button
                onClick={() => {
             localStorage.removeItem("token");
            navigate("/");
          }}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Note Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Create New Note</h2>
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showCreateForm ? 'Cancel' : 'New Note'}</span>
                  </button>
                </div>

                {showCreateForm && (
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter note title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                        disabled={isCreating}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Write your note content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 resize-none"
                        disabled={isCreating}
                      />
                    </div>
                    <button
                      onClick={onCreate}
                      disabled={isCreating || !title.trim() || !content.trim()}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isCreating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      <span>{isCreating ? 'Creating...' : 'Create Note'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Limit Warning */}
            {/* Limit Warning ✅ only if free + 3 notes */}
            {reachedLimit && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-800 mb-2">Free Plan Limit Reached</h3>
                    <p className="text-amber-700 mb-4">You've reached the maximum of 3 notes on the free plan.</p>
                    {user.role === "admin" ? (
                      <button
                        onClick={onUpgrade}
                        className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Upgrade to Pro</span>
                      </button>
                    ) : (
                      <p className="text-sm text-amber-600">Please ask your admin to upgrade to Pro plan.</p>
                    )}
                  </div>
                </div>
              </div>
            )}


            {/* Notes List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Your Notes</h2>
                  <span className="text-sm text-gray-500">{notes.length} notes</span>
                </div>

                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                    <p className="text-gray-500">Create your first note to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div
                        key={note._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{note.title}</h3>
                            <p className="text-sm text-gray-500">Created {note.createdAt}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => onView(note._id)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                              title="View note"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onEdit(note)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                              title="Edit note"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDelete(note._id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              title="Delete note"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">{note.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Invitation (Admin Only) */}
            {user.role === "admin" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Invite Team Member</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="colleague@company.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                        disabled={isInviting}
                      />
                    </div>
                    <button
                      onClick={onInvite}
                      disabled={isInviting || !inviteEmail.trim()}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isInviting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                      <span>{isInviting ? 'Sending...' : 'Send Invitation'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Plan</span>
                    <span className="text-sm font-medium text-gray-900">{plan}</span> {/* ✅ show actual plan */}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Notes Used</span>
                    <span className="text-sm font-medium text-gray-900">
                      {plan === "free" ? `${notes.length} / 3` : `${notes.length} (Pro)`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Tenant</span>
                    <span className="text-sm font-medium text-gray-900">{user.tenant}</span>
                  </div>
                </div>
              </div>
              </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Use descriptive titles for better organization</li>
                <li>• Keep notes concise and focused</li>
                <li>• Regularly review and update your notes</li>
                <li>• Invite team members to collaborate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
