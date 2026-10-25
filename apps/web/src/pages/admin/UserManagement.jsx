import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Shield, 
  UserX, 
  UserCheck, 
  Trash2, 
  Eye, 
  MoreVertical, 
  UserPlus 
} from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import Modal from '../../components/Modal';
import { AdminAPI } from '../../services/api';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRole, setNewRole] = useState('user');
  const [actionLoading, setActionLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await AdminAPI.getUsers({
        role: roleFilter,
        status: statusFilter,
        search: searchTerm
      });
      setUsers(data || []);
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    if (!window.confirm(`Are you sure you want to mark ${user.email} as ${nextStatus}?`)) return;

    try {
      await AdminAPI.updateUserStatus(user.uid, nextStatus);
      setUsers(users.map(u => u.uid === user.uid ? { ...u, status: nextStatus } : u));
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleRoleChangeSubmit = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await AdminAPI.updateUserRole(selectedUser.uid, newRole);
      setUsers(users.map(u => u.uid === selectedUser.uid ? { ...u, role: newRole } : u));
      setIsRoleModalOpen(false);
    } catch (err) {
      alert(`Role update error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`CAUTION: Permanently delete account ${user.email}? This action cannot be undone.`)) return;

    try {
      await AdminAPI.deleteUser(user.uid);
      setUsers(users.filter(u => u.uid !== user.uid));
    } catch (err) {
      alert(`Deletion error: ${err.message}`);
    }
  };

  return (
    <div>
      <AdminHeader
        title="User Management"
        subtitle="Manage user accounts, roles, access permissions, and account statuses"
        onRefresh={loadUsers}
        loading={loading}
      />

      <div className="admin-content">
        {/* Search & Filter Toolbar */}
        <div className="que-card" style={{ marginBottom: '24px', padding: '16px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by name, email, or UID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="que-input"
                style={{ paddingLeft: '38px', height: '40px' }}
              />
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--que-text-muted)'
              }} />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="que-input"
                style={{ height: '40px', width: '130px', cursor: 'pointer' }}
              >
                <option value="">All Roles</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="user">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="que-input"
                style={{ height: '40px', width: '130px', cursor: 'pointer' }}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
                <option value="suspended">Suspended</option>
              </select>

              <button type="submit" className="que-btn que-btn-forest" style={{ height: '40px', padding: '0 16px' }}>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>

        {/* Users Table */}
        <div className="que-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--que-canvas-subtle)', borderBottom: '1px solid var(--que-border)' }}>
                  <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>
                    User / Email
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>
                    Role
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase' }}>
                    Created
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: '12px', fontWeight: '600', color: 'var(--que-text-secondary)', textTransform: 'uppercase', textAlign: 'right' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'var(--que-text-secondary)' }}>
                      Loading accounts...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '48px', textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--que-forest-base)', marginBottom: '4px' }}>
                        No users found
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                        No user documents match your search or filter criteria.
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const isSuper = u.role === 'superadmin' || u.email === 'que.solutions.service@gmail.com';
                    return (
                      <tr key={u.uid} style={{ borderBottom: '1px solid var(--que-border)' }}>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: '600', color: 'var(--que-text-primary)', fontSize: '14px' }}>
                            {u.displayName || 'Unnamed User'}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--que-text-secondary)' }}>
                            {u.email}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--que-text-muted)', fontFamily: 'monospace' }}>
                            UID: {u.uid?.substring(0, 16)}...
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span className={`que-badge que-badge-${u.role || 'user'}`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span className={`que-badge ${u.status === 'active' ? 'que-badge-active' : 'que-badge-disabled'}`}>
                            {u.status || 'active'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--que-text-secondary)' }}>
                          {u.metadata?.createdAt ? new Date(u.metadata.createdAt.seconds ? u.metadata.createdAt.seconds * 1000 : u.metadata.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            {/* Details */}
                            <button
                              onClick={() => { setSelectedUser(u); setIsDetailsOpen(true); }}
                              className="que-btn que-btn-outline"
                              style={{ height: '32px', width: '32px', padding: 0 }}
                              title="View Details"
                            >
                              <Eye size={15} />
                            </button>

                            {/* Assign Role */}
                            <button
                              onClick={() => { setSelectedUser(u); setNewRole(u.role || 'user'); setIsRoleModalOpen(true); }}
                              className="que-btn que-btn-outline"
                              style={{ height: '32px', width: '32px', padding: 0 }}
                              title="Assign Role"
                            >
                              <Shield size={15} />
                            </button>

                            {/* Toggle Disable / Enable */}
                            {!isSuper && (
                              <button
                                onClick={() => handleToggleStatus(u)}
                                className="que-btn que-btn-outline"
                                style={{ height: '32px', width: '32px', padding: 0 }}
                                title={u.status === 'active' ? 'Disable Account' : 'Enable Account'}
                              >
                                {u.status === 'active' ? <UserX size={15} color="var(--que-error)" /> : <UserCheck size={15} color="var(--que-success)" />}
                              </button>
                            )}

                            {/* Delete User */}
                            {!isSuper && (
                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="que-btn que-btn-outline"
                                style={{ height: '32px', width: '32px', padding: 0 }}
                                title="Delete Account"
                              >
                                <Trash2 size={15} color="var(--que-error)" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="User Account Details"
        footer={(
          <button onClick={() => setIsDetailsOpen(false)} className="que-btn que-btn-outline">
            Close
          </button>
        )}
      >
        {selectedUser && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--que-text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Full UID</div>
              <div style={{ fontSize: '13px', fontFamily: 'monospace', color: 'var(--que-text-primary)' }}>{selectedUser.uid}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--que-text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Email Address</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--que-text-primary)' }}>{selectedUser.email}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--que-text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Role</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{selectedUser.role}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--que-text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Account Status</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{selectedUser.status}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Role Assignment Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Change User Authorization Role"
        footer={(
          <>
            <button onClick={() => setIsRoleModalOpen(false)} className="que-btn que-btn-outline">
              Cancel
            </button>
            <button
              onClick={handleRoleChangeSubmit}
              disabled={actionLoading}
              className="que-btn que-btn-forest"
            >
              {actionLoading ? 'Updating...' : 'Save Role'}
            </button>
          </>
        )}
      >
        <p style={{ fontSize: '14px', color: 'var(--que-text-secondary)', margin: '0 0 16px 0' }}>
          Assign an authorized role for <strong>{selectedUser?.email}</strong>. This updates both Firebase Custom Claims and Firestore permissions.
        </p>

        <div className="que-input-group">
          <label className="que-label">Select Role</label>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="que-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="user">User (Standard App Access)</option>
            <option value="staff">Staff (Support & Operations)</option>
            <option value="admin">Admin (Portal Management)</option>
            <option value="superadmin">Super Admin (Full Enterprise Authority)</option>
          </select>
        </div>
      </Modal>
    </div>
  );
}
