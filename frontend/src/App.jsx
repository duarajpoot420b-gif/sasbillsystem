import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [billNumber, setBillNumber] = useState(Math.floor(1000 + Math.random() * 9000));
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Discount states
  const [discountType, setDiscountType] = useState('percentage'); // 'percentage' or 'fixed'
  const [discountValue, setDiscountValue] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const addProduct = () => {
    if (productName && price) {
      const newProduct = {
        id: Date.now(),
        name: productName,
        qty: parseInt(quantity),
        price: parseFloat(price),
        total: parseInt(quantity) * parseFloat(price)
      };
      
      setProducts([...products, newProduct]);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
      setProductName('');
      setQuantity(1);
      setPrice('');
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Calculate all totals
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  
  const discountAmount = discountValue ? 
    (discountType === 'percentage' ? (subtotal * parseFloat(discountValue)) / 100 : parseFloat(discountValue)) 
    : 0;
  
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxRate ? (taxableAmount * parseFloat(taxRate)) / 100 : 0;
  const grandTotal = taxableAmount + taxAmount;

  const generatePremiumBill = () => {
    if (products.length === 0) {
      alert('Please add at least one product to generate bill!');
      return;
    }

    const billHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SAS Bill #${billNumber}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }
          
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .bill-container {
            max-width: 400px;
            background: white;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0,0,0,0.2);
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
          }
          
          /* Bill Header with Beautiful Gradient */
          .bill-header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #f97316 100%);
            color: white;
            padding: 30px 25px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .bill-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            animation: shine 3s infinite;
          }
          
          @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
          
          .company-name {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            letter-spacing: 1px;
          }
          
          .company-tagline {
            font-size: 14px;
            opacity: 0.95;
            margin-bottom: 12px;
            font-weight: 500;
          }
          
          .bill-meta {
            font-size: 12px;
            opacity: 0.9;
            background: rgba(255,255,255,0.2);
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-block;
            backdrop-filter: blur(10px);
          }
          
          /* Bill Content */
          .bill-content {
            padding: 25px;
          }
          
          /* Customer Section */
          .customer-section {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
          
          .customer-name {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
          }
          
          .customer-phone {
            font-size: 14px;
            opacity: 0.9;
          }
          
          /* Products Table */
          .products-section {
            margin: 25px 0;
          }
          
          .table-header {
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: white;
            padding: 15px;
            border-radius: 12px 12px 0 0;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 10px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .table-body {
            background: #f8fafc;
            border-radius: 0 0 12px 12px;
            overflow: hidden;
          }
          
          .table-row {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 10px;
            padding: 12px 15px;
            border-bottom: 1px solid #e5e7eb;
            align-items: center;
            transition: all 0.3s ease;
          }
          
          .table-row:last-child {
            border-bottom: none;
          }
          
          .table-row:hover {
            background: #f0f9ff;
            transform: translateX(5px);
          }
          
          .product-name {
            font-weight: 600;
            color: #1f2937;
          }
          
          .product-qty, .product-price {
            color: #6b7280;
            text-align: center;
          }
          
          .product-total {
            font-weight: 700;
            color: #059669;
            text-align: right;
          }
          
          /* Calculation Section */
          .calculation-section {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid #e5e7eb;
          }
          
          .calculation-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .calculation-row:last-child {
            border-bottom: none;
          }
          
          .calculation-label {
            color: #6b7280;
            font-size: 14px;
          }
          
          .calculation-value {
            font-weight: 600;
            color: #1f2937;
          }
          
          .discount-row {
            color: #ef4444;
          }
          
          .tax-row {
            color: #3b82f6;
          }
          
          /* Total Section */
          .total-section {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            margin: 25px 0;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
            position: relative;
            overflow: hidden;
          }
          
          .total-section::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .total-label {
            font-size: 16px;
            opacity: 0.9;
            margin-bottom: 8px;
          }
          
          .grand-total {
            font-size: 32px;
            font-weight: 800;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }
          
          /* Bill Footer */
          .bill-footer {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 25px;
            text-align: center;
            border-top: 3px solid #e5e7eb;
          }
          
          .contact-info {
            margin-bottom: 15px;
          }
          
          .contact-line {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .contact-line strong {
            color: #1f2937;
          }
          
          .thank-you {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 700;
            font-size: 14px;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
          }
          
          /* Watermark */
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            font-weight: 900;
            color: rgba(0,0,0,0.03);
            pointer-events: none;
            z-index: 1;
          }
          
          /* Print Styles */
          @media print {
            body {
              background: white !important;
              padding: 0;
            }
            
            .bill-container {
              box-shadow: none !important;
              border: 1px solid #ccc !important;
              margin: 0;
              border-radius: 0;
            }
            
            .watermark {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="bill-container">
          <div class="watermark">SAS</div>
          
          <!-- Bill Header -->
          <div class="bill-header">
            <div class="company-name">SAS CORPORATION</div>
            <div class="company-tagline">Premium Sanitary Solutions & RO Systems</div>
            <div class="bill-meta">
              Bill #${billNumber} | ${new Date().toLocaleDateString('en-PK', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                weekday: 'short'
              })} | ${new Date().toLocaleTimeString('en-PK', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          
          <!-- Bill Content -->
          <div class="bill-content">
            <!-- Customer Information -->
            <div class="customer-section">
              <div class="customer-name">${customerName || 'Walk-in Customer'}</div>
              <div class="customer-phone">${customerPhone || 'No phone provided'}</div>
            </div>
            
            <!-- Products Table -->
            <div class="products-section">
              <div class="table-header">
                <div>PRODUCT</div>
                <div>QTY</div>
                <div>PRICE</div>
                <div>TOTAL</div>
              </div>
              
              <div class="table-body">
                ${products.map(product => `
                  <div class="table-row">
                    <div class="product-name">${product.name}</div>
                    <div class="product-qty">${product.qty}</div>
                    <div class="product-price">${product.price} PKR</div>
                    <div class="product-total">${product.total} PKR</div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- Calculations -->
            <div class="calculation-section">
              <div class="calculation-row">
                <span class="calculation-label">Subtotal</span>
                <span class="calculation-value">${subtotal.toLocaleString()} PKR</span>
              </div>
              ${discountValue ? `
                <div class="calculation-row discount-row">
                  <span class="calculation-label">Discount ${discountType === 'percentage' ? `(${discountValue}%)` : '(Fixed)'}</span>
                  <span class="calculation-value">- ${discountAmount.toLocaleString()} PKR</span>
                </div>
              ` : ''}
              ${taxRate ? `
                <div class="calculation-row tax-row">
                  <span class="calculation-label">Tax (${taxRate}%)</span>
                  <span class="calculation-value">+ ${taxAmount.toLocaleString()} PKR</span>
                </div>
              ` : ''}
            </div>
            
            <!-- Grand Total -->
            <div class="total-section">
              <div class="total-label">GRAND TOTAL</div>
              <div class="grand-total">${grandTotal.toLocaleString()} PKR</div>
            </div>
          </div>
          
          <!-- Bill Footer -->
          <div class="bill-footer">
            <div class="contact-info">
              <div class="contact-line">
                <strong>📍 Shop #8, Al Haj Market, GT Road Islamabad</strong>
              </div>
              <div class="contact-line">
                📞 <strong>0311-9624139</strong> (Shehzad Bhatti) | 
                📞 <strong>0317-5473116</strong> (Sharafat Bhatti)
              </div>
              <div class="contact-line">
                💧 <strong>Aden Aqua Filtration</strong> - Domestic & Commercial RO Systems
              </div>
            </div>
            <div class="thank-you">
              Thank you for your business! 🛍️
            </div>
          </div>
        </div>
        
        <script>
          // Auto print and close
          setTimeout(() => {
            window.print();
            setTimeout(() => window.close(), 1000);
          }, 500);
        </script>
      </body>
      </html>
    `;

    const billWindow = window.open('', '_blank', 'width=450,height=800,scrollbars=no');
    billWindow.document.write(billHTML);
    billWindow.document.close();
  };

  const clearBill = () => {
    setProducts([]);
    setCustomerName('');
    setCustomerPhone('');
    setDiscountValue('');
    setTaxRate('');
    setBillNumber(Math.floor(1000 + Math.random() * 9000));
  };

  // Enter key to add product
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && productName && price) {
        addProduct();
      }
    };
    
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [productName, price]);

  return (
    <div className="ultimate-container">
      {/* Ultimate Header */}
      <div className={`ultimate-header ${showAnimation ? 'pulse' : ''}`}>
        <div className="header-wrapper">
          <div className="brand-section">
            <div className="brand-logo">💧</div>
            <div className="brand-text">
              <h1 className="brand-title">SAS Billing Pro</h1>
              <p className="brand-subtitle">Professional Invoice System</p>
            </div>
          </div>
          <div className="status-badges">
            <span className="status-badge mobile">📱 Mobile Ready</span>
            <span className="status-badge desktop">💻 Desktop Optimized</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content-wrapper">
        
        {/* Customer Information Section */}
        <div className="ultimate-card">
          <div className="card-heading">
            <div className="heading-icon">👤</div>
            <div className="heading-content">
              <h2>Customer Information</h2>
              <p>Enter client details for billing</p>
            </div>
          </div>
          
          <div className="responsive-grid">
            <div className="input-container">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                placeholder="Enter customer full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="ultimate-input"
              />
            </div>
            
            <div className="input-container">
              <label className="input-label">Phone Number</label>
              <input
                type="text"
                placeholder="03XX-XXXXXXX"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="ultimate-input"
              />
            </div>
          </div>
        </div>

        {/* Add Products Section */}
        <div className="ultimate-card">
          <div className="card-heading">
            <div className="heading-icon">📦</div>
            <div className="heading-content">
              <h2>Add Products</h2>
              <p>Enter product details below</p>
            </div>
          </div>
          
          <div className="products-input-grid">
            <div className="input-container full-width">
              <label className="input-label">Product Name</label>
              <input
                type="text"
                placeholder="e.g., Water Filter, Tap, Pipe"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="ultimate-input"
              />
            </div>
            
            <div className="input-container">
              <label className="input-label">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="ultimate-input"
              />
            </div>
            
            <div className="input-container">
              <label className="input-label">Unit Price (PKR)</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ultimate-input"
              />
            </div>
            
            <div className="input-container">
              <label className="input-label invisible">Add</label>
              <button onClick={addProduct} className="ultimate-add-btn">
                <span className="btn-emoji">➕</span>
                Add Item
              </button>
            </div>
          </div>
          
          <div className="helper-text">
            <span className="helper-icon">💡</span>
            Press Enter to quickly add products
          </div>
        </div>

        {/* Discount & Tax Section */}
        <div className="ultimate-card">
          <div className="card-heading">
            <div className="heading-icon">💰</div>
            <div className="heading-content">
              <h2>Discount & Tax</h2>
              <p>Apply discounts and taxes</p>
            </div>
          </div>
          
          <div className="discount-tax-grid">
            <div className="input-container">
              <label className="input-label">Discount Type</label>
              <select 
                value={discountType} 
                onChange={(e) => setDiscountType(e.target.value)}
                className="ultimate-input"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            
            <div className="input-container">
              <label className="input-label">
                {discountType === 'percentage' ? 'Discount %' : 'Discount Amount (PKR)'}
              </label>
              <input
                type="number"
                placeholder={discountType === 'percentage' ? '0' : '0'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="ultimate-input"
                min="0"
                max={discountType === 'percentage' ? '100' : ''}
              />
            </div>
            
            <div className="input-container">
              <label className="input-label">Tax Rate (%)</label>
              <input
                type="number"
                placeholder="0"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="ultimate-input"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Products List Section */}
        {products.length > 0 && (
          <div className="ultimate-card">
            <div className="card-heading">
              <div className="heading-icon">🛒</div>
              <div className="heading-content">
                <h2>Order Summary</h2>
                <p>{products.length} items in cart</p>
              </div>
            </div>
            
            <div className="products-display">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="product-display-item"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="product-details">
                    <span className="item-name">{product.name}</span>
                    <span className="item-specs">{product.qty} × {product.price} PKR</span>
                  </div>
                  <div className="product-controls">
                    <span className="item-total">{product.total} PKR</span>
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="ultimate-remove-btn"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total Display */}
            <div className="ultimate-total-section">
              <div className="total-breakdown">
                <div className="breakdown-line">
                  <span className="breakdown-label">Subtotal</span>
                  <span className="breakdown-value">{subtotal.toLocaleString()} PKR</span>
                </div>
                
                {discountValue && (
                  <div className="breakdown-line discount-breakdown">
                    <span className="breakdown-label">
                      Discount {discountType === 'percentage' ? `(${discountValue}%)` : '(Fixed)'}
                    </span>
                    <span className="breakdown-value">- {discountAmount.toLocaleString()} PKR</span>
                  </div>
                )}
                
                {taxRate && (
                  <div className="breakdown-line tax-breakdown">
                    <span className="breakdown-label">Tax ({taxRate}%)</span>
                    <span className="breakdown-value">+ {taxAmount.toLocaleString()} PKR</span>
                  </div>
                )}
                
                <div className="breakdown-line main-breakdown">
                  <span className="breakdown-label">Grand Total</span>
                  <span className="breakdown-value main-value">{grandTotal.toLocaleString()} PKR</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ultimate-actions">
              <button onClick={generatePremiumBill} className="action-button print-action">
                <span className="action-emoji">🎨</span>
                Generate Beautiful Bill
              </button>
              <button onClick={clearBill} className="action-button clear-action">
                <span className="action-emoji">🗑️</span>
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Bill Information Footer */}
        <div className="info-footer">
          <div className="footer-content">
            <div className="footer-item">
              <span className="footer-label">Bill Number:</span>
              <span className="footer-value">{billNumber}</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Date:</span>
              <span className="footer-value">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="footer-item">
              <span className="footer-label">Time:</span>
              <span className="footer-value">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action for Mobile */}
      {products.length > 0 && (
        <div className="floating-action-container">
          <button onClick={generatePremiumBill} className="floating-action-button">
            🎨 Print Bill
          </button>
        </div>
      )}
    </div>
  );
}

export default App;