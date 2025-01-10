@@ .. @@
   return (
     <>
       <LoadingOverlay isVisible={isLoading} />
-      <div className="min-h-screen flex flex-col">
+      <div className="min-h-screen flex flex-col relative">
         <Navbar />
+        <AnnouncementBanner />
         <main className="flex-grow">
           {children}
         </main>
         <Footer />
         <StickyButtons />
       </div>
     </>